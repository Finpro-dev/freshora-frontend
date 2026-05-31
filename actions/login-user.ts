"use server";

import axios from "axios";
import { LoginInput } from "../app/login/_schema/login-schema";

export const loginUser = async ({ email, password }: LoginInput) => {
  let res;
  try {
    console.log(email, password);
    res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
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
