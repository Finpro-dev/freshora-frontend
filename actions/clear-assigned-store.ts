"use server";

import { forwardExpressCookie } from "@/shared/utils/cookie-forwarder-util";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const clearAssignedStore = async (storeId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/stores/${storeId}`,
      {
        userId: null,
      },
      {
        headers: {
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken};`,
        },
      },
    );
    await forwardExpressCookie(res.headers["set-cookie"]);

    revalidatePath("/dashboard/store");
    revalidatePath(`/dashboard/store/${storeId}`);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
