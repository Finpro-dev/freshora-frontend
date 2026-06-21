"use server";

import axios from "axios";
import { LoginInput } from "../app/(auth)/login/_schemas/login-schema";
import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import { ApiResponse } from "@/shared/types/api-type";
import { User } from "@/shared/types/user-type";

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

    const data: ApiResponse<User> = res.data;

    await forwardExpressCookie(res.headers["set-cookie"]);

    return { data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
