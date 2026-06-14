"use server";

import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";
import { cookies } from "next/headers";

export const getUserAddresses = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/addresses`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken};`,
        },
      },
    );

    await forwardExpressCookie(res.headers["set-cookie"]);

    // revalidatePath("/account/address");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
