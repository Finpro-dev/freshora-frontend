import ScrollToTop from "@/shared/components/ScrollToTop";
import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { AuthStates } from "@/shared/store/auth-store/auth-store";
import DashboardStoreProviders from "@/shared/store/DashboardStoreProviders";
import { ApiResponse } from "@/shared/types/api-type";
import { Gender, Role, User } from "@/shared/types/user-type";
import { Metadata } from "next";
import { cookies } from "next/headers";
import DashboardSideBar from "../_components/DashboardSideBar";
import MobileDashboardNavbar from "../_components/MobileDashboardNavbar";

export const metadata: Metadata = {
  title: "Dashboard",
};

interface DashboardLayout {
  children: React.ReactNode;
}

async function layout({ children }: DashboardLayout) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  let response = null;

  if (accessToken || refreshToken) {
    response = await fetch(`${CORS_CREDENTIALS.API_BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });
  }

  const data: ApiResponse<User> | undefined = response
    ? await response.json()
    : undefined;

  const initialAuth: AuthStates = {
    userId: String(data?.data?.userId || ""),
    firstName: String(data?.data?.firstName || ""),
    lastName: String(data?.data?.lastName || ""),
    email: String(data?.data?.email || ""),
    avatar: String(data?.data?.avatar || ""),
    phone: String(data?.data?.phone || ""),
    role: data?.data?.role as Role,
    isVerified: Boolean(data?.data?.isVerified),
    gender: data?.data?.gender as Gender,
  };

  return (
    <div className="min-h-dvh w-full">
      <DashboardStoreProviders initialAuth={initialAuth}>
        <ScrollToTop />
        <MobileDashboardNavbar />
        <div className="flex h-dvh">
          <DashboardSideBar />
          <div className="h-full w-full overflow-hidden sm:overflow-auto">
            {children}
          </div>
        </div>
      </DashboardStoreProviders>
    </div>
  );
}

export default layout;
