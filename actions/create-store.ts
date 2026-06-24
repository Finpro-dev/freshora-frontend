"use server";

import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createNewStore = async (formData: FormData) => {
  const allCookie = await cookies();
  const accessToken = allCookie.get("accessToken")?.value;
  const refreshToken = allCookie.get("refreshToken")?.value;
  try {
    const res = await axios.post(
      `${CORS_CREDENTIALS.API_BASE_URL}/stores`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
