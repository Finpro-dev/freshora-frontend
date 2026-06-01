"use server";

import { CORS_CREDENTIALS } from "@/config/dotenv-config";
import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";

export const createPassword = async (
  password: string,
  confirmPassword: string,
  token: string,
) => {
  try {
    const res = await axios.patch(
      `${CORS_CREDENTIALS.API_BASE_URL}/auth/create-password/${token}`,
      {
        password,
        confirmPassword,
      },
      {
        withCredentials: true,
      },
    );

    await forwardExpressCookie(res.headers["set-cookie"]);

    return { data: res.data.data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.messsage || "There's an issue in the server!";

    return { success: false, error: errorMessage };
  }
};
