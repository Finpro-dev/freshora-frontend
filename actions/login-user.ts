"use server";

import { LoginInput } from "@/app/login/_schema/login-schema";
import { api } from "@/lib/axios-instance";

export const loginUser = async ({ email, password }: LoginInput) => {
  let res;
  try {
    console.log(email, password);
    res = await api.post("/auth/login", {
      email,
      password,
    });

    return res.data.data;
  } catch (error) {
    //FIXME ->> toast
    console.log(error);
  }

  //FIXME ->> user role based
};
