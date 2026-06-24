"use server";

import { CreateTransaction } from "@/app/(main)/transaction/_types/create-transaction";
import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createTransaction = async (data: CreateTransaction) => {
  const allCookie = await cookies();
  const accessToken = allCookie.get("accessToken")?.value;
  const refreshToken = allCookie.get("refreshToken")?.value;
  try {
    const res = await axios.post(
      `${CORS_CREDENTIALS.API_BASE_URL}/transactions`,
      { ...data },
      {
        headers: {
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken};`,
        },
      },
    );

    await forwardExpressCookie(res.headers["set-cookie"]);
    return { data: res.data.data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
