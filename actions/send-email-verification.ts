"use server";

import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";

export const sendEmailVerification = async (email: string) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-request`,
      {
        email,
        verifyType: "VERIFY_ONLY",
      },
    );
    await forwardExpressCookie(res.headers["set-cookie"]);
    return { success: true, data: res.data.data, error: "" };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong during sending email verification!";

    return { success: false, data: "", error: errorMessage };
  }
};
