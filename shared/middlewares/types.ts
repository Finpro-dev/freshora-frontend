import { NextRequest, NextResponse } from "next/server";
import { Role } from "../types/user-type";

export type MiddlewareFactory = (
  request: NextRequest,
  response: NextResponse,
) => Promise<NextResponse | null> | NextResponse | null;

export type TokenPayload = {
  userId: string;
  fullName: string;
  role: Role;
  iat: number;
  exp: number;
};
