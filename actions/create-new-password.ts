"use server";

import axios from "axios";

export const createPassword = async (
  password: string,
  confirmPassword: string,
  token: string,
) => {
  try {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/create-password/${token}`,
      {
        password,
        confirmPassword,
      },
      {
        withCredentials: true,
      },
    );
    //FIXME ->> add toast
  } catch (error) {
    //FIXME ->> add toast
    console.log(error);
  }
};
