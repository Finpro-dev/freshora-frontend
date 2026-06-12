"use server";

import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";

export const logoutUser = async () => {
  let res;
  try {
    res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );

    console.log("RES", res);

    await forwardExpressCookie(res.headers["set-cookie"]);

    return { data: res.data.data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
