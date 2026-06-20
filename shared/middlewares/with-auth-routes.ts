import { NextRequest, NextResponse } from "next/server";
import { TOKEN_CREDENTIALS } from "../config/dotenv-config";
import { jwtVerify } from "jose";
import { TokenPayload } from "./types";

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
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const token = accessToken || refreshToken;
  const jwtSecret =
    token === accessToken
      ? TOKEN_CREDENTIALS.JWT_ACCESS_SECRET
      : TOKEN_CREDENTIALS.JWT_REFRESH_SECRET;

  if (isMatch && !accessToken) {
    return null;
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  const secret = new TextEncoder().encode(jwtSecret);
  const { payload } = await jwtVerify(token as string, secret);
  const tokenPayload = payload as TokenPayload;
  const userRole = tokenPayload.role;
  const callbackUrl = userRole === "CUSTOMER" ? "/" : "/dashboard";

  if (isMatch) {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL(callbackUrl, request.url));
    }
  }

  return null; // escape to the next middleware
}
