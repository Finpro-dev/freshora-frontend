"use server";

import axios from "axios";
import { LoginInput } from "../app/login/_schemas/login-schema";
import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";

export const loginUser = async ({ email, password }: LoginInput) => {
  let res;
  try {
    res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email,
        password,
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

    return { success: false, error: errorMessage };
  }
};
