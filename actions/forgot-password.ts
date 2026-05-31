import axios from "axios";

export const forgotPassword = async (email: string) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password-request`,
      {
        email,
      },
    );

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
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`,
      {
        password,
        confirmPassword,
      },
    );
    //FIXME ->> add toast
  } catch (error) {
    //FIXME ->> add toast
    console.log(error);
  }
};
