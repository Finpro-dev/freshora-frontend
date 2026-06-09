"use server";

import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { ApiResponse } from "@/shared/types/api-type";
import { User } from "@/shared/types/user-type";
import { cookies } from "next/headers";

export const getUserProfile = async (): Promise<ApiResponse<User>> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const res = await fetch(`${CORS_CREDENTIALS.API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Cookie: allCookies,
      "Content-Type": "application/json",
    },
  });

  return res.json();
};
