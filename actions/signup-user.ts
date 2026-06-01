"use server";

import { SignupInput } from "@/app/signup/_schemas/signup-schema";
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

    return res.data.data;
  } catch (error) {
    //FIXME ->> add toast
    console.log(error);
  }
};
