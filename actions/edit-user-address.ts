"use server";

import { EditAddressApiInput } from "@/app/(main)/account/address/[addressId]/_types/edit-address-input-type";
import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const editUserAddress = async (
  data: EditAddressApiInput,
  addressId: string,
) => {
  const allCookie = await cookies();
  const accessToken = allCookie.get("accessToken")?.value;
  const refreshToken = allCookie.get("refreshToken")?.value;

  try {
    const res = await axios.patch(
      `${CORS_CREDENTIALS.API_BASE_URL}/addresses/${addressId}`,
      data,
      {
        headers: {
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken};`,
        },
      },
    );

    await forwardExpressCookie(res.headers["set-cookie"]);
    revalidatePath("/account/address");
    revalidatePath(`/account/address/${addressId}`);
    return { data: res.data.data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
