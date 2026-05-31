import { api } from "@/lib/axios-instance";

export const forgotPassword = async (email: string) => {
  try {
    await api.post("/auth/reset-password-request", {
      email,
    });

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
    await api.patch(`auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });
    //FIXME ->> add toast
  } catch (error) {
    //FIXME ->> add toast
    console.log(error);
  }
};
