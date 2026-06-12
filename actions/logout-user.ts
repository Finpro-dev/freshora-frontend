"use server";

import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  let res;
  try {
    res = await axios.post(
      `${CORS_CREDENTIALS.API_BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken};`,
        },
        withCredentials: true,
      },
    );

    console.log("RES", res);

    await forwardExpressCookie(res.headers["set-cookie"]);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
