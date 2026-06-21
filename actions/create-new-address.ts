"use server";

import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { CreateAddress } from "@/shared/types/address-type";
import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createNewAddress = async (data: CreateAddress) => {
  const allCookie = await cookies();
  const accessToken = allCookie.get("accessToken")?.value;
  const refreshToken = allCookie.get("refreshToken")?.value;
  try {
    const res = await axios.post(
      `${CORS_CREDENTIALS.API_BASE_URL}/addresses/`,
      data,
      {
        headers: {
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken};`,
        },
      },
    );

    await forwardExpressCookie(res.headers["set-cookie"]);
    revalidatePath("/account/address");
    return { data: res.data.data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
