<<<<<<< Updated upstream
import { api } from "@/lib/axios-instance";

export const forgotPassword = async (email: string) => {
  try {
    await api.post("/auth/reset-password-request", {
      email,
    });
=======
import axios from "axios";

export const forgotPassword = async (email: string) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password-request`,
      {
        email,
      },
    );
>>>>>>> Stashed changes

    //FIXME ->> add toast
  } catch (error) {
    //FIXME ->> add toast
    console.log(error);
  }
};

export const createPassword = async (
  password: string,
  confirmPassword: string,
  token: string,
) => {
  try {
<<<<<<< Updated upstream
    await api.patch(`auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });
=======
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`,
      {
        password,
        confirmPassword,
      },
    );
>>>>>>> Stashed changes
    //FIXME ->> add toast
  } catch (error) {
    //FIXME ->> add toast
    console.log(error);
  }
};
