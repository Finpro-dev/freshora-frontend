"use server";

import { SignupInput } from "@/app/signup/_schemas/signup-schema";
import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";

export const signupCustomer = async (data: SignupInput) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        ...data,
        role: "CUSTOMER",
      },
      {
        withCredentials: true,
      },
    );

    await forwardExpressCookie(res.headers["set-cookie"]);

    return { data: res.data.data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    if (error.response?.headers["set-cookie"])
      await forwardExpressCookie(error.response.headers["set-cookie"]);

    return { success: false, error: errorMessage };
  }
};
