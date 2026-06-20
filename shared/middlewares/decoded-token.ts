// src/_lib/middleware/decode-token.ts
import { jwtVerify } from "jose";
import { TOKEN_CREDENTIALS } from "../config/dotenv-config";
import { Role } from "../types/user-type";

export async function getRoleFromCookie(
  accessToken: string | undefined,
): Promise<Role | null> {
  if (!accessToken) return null;

  try {
    const secret = new TextEncoder().encode(
      TOKEN_CREDENTIALS.JWT_ACCESS_SECRET,
    );
    const { payload } = await jwtVerify(accessToken, secret);
    return (payload.role as Role) || null;
  } catch (error) {
    // return null if invalid or expired
    return null;
  }
}
