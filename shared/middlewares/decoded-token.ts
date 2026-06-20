// src/_lib/middleware/decode-token.ts
import { jwtVerify } from "jose";
import { TOKEN_CREDENTIALS } from "../config/dotenv-config";
import { Role } from "../types/user-type";

export async function getRoleFromCookie(
  token: string | undefined,
  tokenSecret: string,
): Promise<Role | null> {
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(tokenSecret);
    const { payload } = await jwtVerify(token, secret);
    return (payload.role as Role) || null;
  } catch (error) {
    // return null if invalid or expired
    return null;
  }
}
