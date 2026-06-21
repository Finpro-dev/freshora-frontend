"use server";

import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const deleteStore = async (storeId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  try {
    const res = await axios.delete(
      `${CORS_CREDENTIALS.API_BASE_URL}/store/${storeId}`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken};`,
        },
      },
    );

    await forwardExpressCookie(res.headers["set-cookie"]);
    revalidatePath("/dashboard/store");
    return { data: res.data.data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
