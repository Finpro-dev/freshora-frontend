import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { forwardExpressCookie } from "./shared/utils/cookie-forwarder-util";
import { forwardMiddlewareCookie } from "./shared/utils/cookie-forwader-middleware-util";
import { CORS_CREDENTIALS } from "./shared/config/dotenv-config";

export async function middleware(request: NextRequest) {
  const {
    cookies,
    nextUrl: { pathname },
  } = request;

  /*
    - pathname will give all the url after the domain except the query params
    - request.url contains the domain url
  */

  const accessToken = cookies.get("accessToken")?.value;
  const refreshToken = cookies.get("refreshToken")?.value;

  let response = NextResponse.next();
  let isRefreshed = false;

  if (!accessToken && !refreshToken) {
    const loginUrl = new URL("/login/credentials", request.url); // create a complete url
    loginUrl.searchParams.set("callback", pathname); // store prev link

    return NextResponse.redirect(loginUrl);
  }

  if (!accessToken && refreshToken) {
    try {
      const res = await fetch(`${CORS_CREDENTIALS.API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          Cookie: cookies.toString(),
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        isRefreshed = true;
        const expressCookies = res.headers.getSetCookie();
        forwardMiddlewareCookie(expressCookies, response);
        return response;
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Your session has finished!";

      if (error.response?.headers["set-cookie"])
        await forwardExpressCookie(error.response.headers["set-cookie"]);

      console.log(errorMessage);
    }
  }

  if (!accessToken) {
    const loginUrl = new URL("/login/credentials", request.url);
    loginUrl.searchParams.set("callback", pathname);

    const resRedirect = NextResponse.redirect(loginUrl);
    resRedirect.cookies.delete("accessToken");
    resRedirect.cookies.delete("refreshToken");

    return resRedirect;
  }

  isRefreshed ? response : NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
