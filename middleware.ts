import { NextRequest, NextResponse } from "next/server";
import { forwardExpressCookie } from "./shared/utils/cookie-forwarder-util";
import { forwardMiddlewareCookie } from "./shared/utils/cookie-forwarder-middleware-util";
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

  // if user haven't logged in
  // --> create a complete url
  // --> store prev link
  // --> redirect the complete url + prev link as a callback params
  /* `pathname` in this code snippet is extracting the path
    part of the URL from the `nextUrl` property of the request
    object. It represents the path after the domain in the
    URL, excluding any query parameters. It is used to
    construct the callback URL for redirection purposes in
    case the user needs to log in or refresh their access
    token. */
  if (!accessToken && !refreshToken) {
    const loginUrl = new URL("/login/credentials", request.url);
    loginUrl.searchParams.set("callback", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // if access token has expired & refreshToken is still active
  // ---> hit the refresh api
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

      // set also the cookie during error in case the error also set cookie
      if (error.response?.headers["set-cookie"])
        await forwardExpressCookie(error.response.headers["set-cookie"]);

      console.log(errorMessage); // fixme
    }
  }

  // after hitting the refresh api, check the access token
  if (!accessToken) {
    const loginUrl = new URL("/login/credentials", request.url);
    loginUrl.searchParams.set("callback", pathname);

    const resRedirect = NextResponse.redirect(loginUrl);
    resRedirect.cookies.delete("accessToken");
    resRedirect.cookies.delete("refreshToken");

    return resRedirect;
  }

  // if refreshed, return the newest response, if not send the original response
  isRefreshed ? response : NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    { source: "/:path*", has: [{ type: "cookie", key: "refreshToken" }] },
  ],
};
