"use server";

<<<<<<< Updated upstream
import { LoginInput } from "@/app/login/_schema/login-schema";
import { api } from "@/lib/axios-instance";
=======
import axios from "axios";
import { LoginInput } from "../app/login/_schema/login-schema";
>>>>>>> Stashed changes

export const loginUser = async ({ email, password }: LoginInput) => {
  let res;
  try {
    console.log(email, password);
<<<<<<< Updated upstream
    res = await api.post("/auth/login", {
=======
    res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
>>>>>>> Stashed changes
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
