import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { TOKEN_CREDENTIALS } from "../config/dotenv-config";
import { TokenPayload } from "./types";

export async function withAuthorizationRoutes(
  request: NextRequest,
  _response: NextResponse,
) {
  const {
    nextUrl: { pathname },
  } = request;

  /*
    if the user enter bypassUrl, we need to continue to avoid any infinite loop caused by :
    if (!isMatch) {
         return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    user will always go to login as indeed there's no access/refresh token
  */

  const bypassUrl = ["/", "/login", "/signup"];
  const isRequiredLogin = bypassUrl.some((path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  });
  if (isRequiredLogin) return null;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const customerPrefixes = [
    "/account",
    "/order",
    "/cart",
    "/products",
    "/unauthorized",
  ];

  const adminPrefixes = ["/dashboard", "/unauthorized"];

  const token = accessToken || refreshToken;
  const jwtSecret =
    token === accessToken
      ? TOKEN_CREDENTIALS.JWT_ACCESS_SECRET
      : TOKEN_CREDENTIALS.JWT_REFRESH_SECRET;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const secret = new TextEncoder().encode(jwtSecret);
  const { payload } = await jwtVerify(token as string, secret);
  const tokenPayload = payload as TokenPayload;
  const userRole = tokenPayload.role;

  const prefixes = userRole === "CUSTOMER" ? customerPrefixes : adminPrefixes;
  const isMatch = prefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isMatch) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return null; // escape to the next middleware
}
