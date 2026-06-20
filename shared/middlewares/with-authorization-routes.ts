import { NextRequest, NextResponse } from "next/server";
import { getRoleFromCookie } from "./decoded-token";
import { TOKEN_CREDENTIALS } from "../config/dotenv-config";

export async function withAuthorizationRoutes(
  request: NextRequest,
  _response: NextResponse,
) {
  const {
    nextUrl: { pathname },
  } = request;

  const ROLE_ROUTES = [
    { prefix: "/dashboard", allowedRoles: ["SUPER_ADMIN", "STORE_ADMIN"] },
    { prefix: "/cart", allowedRoles: ["CUSTOMER"] },
    { prefix: "/account", allowedRoles: ["CUSTOMER"] },
    { prefix: "/order", allowedRoles: ["CUSTOMER"] },
  ];

  const matchedRoute = ROLE_ROUTES?.find((route) => {
    if (pathname === "/" && pathname === route.prefix) return route;
    return pathname.startsWith(route.prefix);
  });

  if (!matchedRoute) return null;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const token = accessToken || refreshToken;
  const tokenSecret =
    token === accessToken
      ? TOKEN_CREDENTIALS.JWT_ACCESS_SECRET
      : TOKEN_CREDENTIALS.JWT_REFRESH_SECRET;

  const userRole = await getRoleFromCookie(token, tokenSecret as string);

  if (!userRole || !matchedRoute.allowedRoles?.includes(String(userRole))) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return null; // escape to the next middleware
}
