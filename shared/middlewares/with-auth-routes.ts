import { NextRequest, NextResponse } from "next/server";

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

  if (isMatch) {
    if (accessToken || refreshToken) {
      // fixme ->> throw based on role
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return null; // escape to the next middleware
}
