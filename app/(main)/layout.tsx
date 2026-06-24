import AppFooter from "@/shared/components/AppFooter";
import AppNavbar from "@/shared/components/AppNavbar";
import ScrollToTop from "@/shared/components/ScrollToTop";
import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { AuthStates } from "@/shared/store/auth-store/auth-store";
import { CartStates } from "@/shared/store/cart-store/cart-store";
import StoreProviders from "@/shared/store/StoreProviders";
import { ApiResponse } from "@/shared/types/api-type";
import { Gender, Role, User } from "@/shared/types/user-type";
import { cookies } from "next/headers";
import AppWrapper from "./_components/AppWrapper";

async function layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  let response = null;
  let cartCountResponse = null;

  if (accessToken || refreshToken) {
    ("use server");
    response = await fetch(`${CORS_CREDENTIALS.API_BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    cartCountResponse = await fetch(
      `${CORS_CREDENTIALS.API_BASE_URL}/cart/count`,
      {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
      },
    );
  }

  const data: ApiResponse<User> | undefined = response
    ? await response.json()
    : undefined;
  const cartCountData = cartCountResponse
    ? await cartCountResponse.json()
    : undefined;

  const initialAuth: AuthStates = {
    userId: String(data?.data?.userId || ""),
    firstName: String(data?.data?.firstName || ""),
    lastName: String(data?.data?.lastName || ""),
    email: String(data?.data?.email || ""),
    avatar: String(data?.data?.avatar || ""),
    phone: String(data?.data?.phone || ""),
    role: (data?.data?.role as Role) || "CUSTOMER",
    isVerified: Boolean(data?.data?.isVerified),
    gender: (data?.data?.gender as Gender) || "MALE",
  };

  const initialCart: CartStates = {
    totalQuantity: cartCountData?.data?.totalQuantity || 0,
    cartId: cartCountData?.data?.cartId || "",
    isLoading: false,
  };

  return (
    <div className="w-full min-h-full">
      <StoreProviders initialAuth={initialAuth} initialCart={initialCart}>
        <ScrollToTop />
        <AppWrapper>
          <AppNavbar />
          {children}
        </AppWrapper>
        <AppFooter />
      </StoreProviders>
    </div>
  );
}

export default layout;
