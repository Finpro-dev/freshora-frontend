import { NextRequest, NextResponse } from "next/server";
import { TOKEN_CREDENTIALS } from "../config/dotenv-config";
import { jwtVerify } from "jose";
import { TokenPayload } from "./types";
import { getRoleFromCookie } from "./decoded-token";

export async function withAuthRoutes(
  request: NextRequest,
  _response: NextResponse,
) {
  const {
    nextUrl: { pathname },
  } = request;

  const prefixes = ["/login", "/signup"];

  const isMatch = prefixes.some((prefix) => pathname.startsWith(prefix));
  const accessToken = request.cookies.get("accessToken")?.value;
  const accessTokenSecret = String(TOKEN_CREDENTIALS.JWT_ACCESS_SECRET);

  if (isMatch && !accessToken) {
    return null;
  }

  const role = await getRoleFromCookie(accessToken, accessTokenSecret);
  // const userRole = tokenPayload.role;
  const callbackUrl = role === "CUSTOMER" ? "/" : "/dashboard";

  if (isMatch) {
    if (accessToken) {
      return NextResponse.redirect(new URL(callbackUrl, request.url));
    }
  }

  return null; // escape to the next middleware
}
