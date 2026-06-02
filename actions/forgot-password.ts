"use server";

import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";

export const resetPassword = async (
  password: string,
  confirmPassword: string,
  token: string,
) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`,
      {
        password,
        confirmPassword,
      },
    );
    await forwardExpressCookie(res.headers["set-cookie"]);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
