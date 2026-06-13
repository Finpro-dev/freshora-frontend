import AppNavbar from "@/shared/components/AppNavbar";
import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { AuthStates } from "@/shared/store/auth-store/auth-store";
import StoreProviders from "@/shared/store/StoreProviders";
import { ApiResponse } from "@/shared/types/api-type";
import { Gender, Role, User } from "@/shared/types/user-type";
import { cookies } from "next/headers";

async function layout({ children }: { children: React.ReactNode }) {
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

  const data: ApiResponse<User> = await response?.json();

  const initialAuth: AuthStates = {
    userId: String(data?.data?.userId),
    firstName: String(data?.data?.firstName),
    lastName: String(data?.data?.lastName),
    email: String(data?.data?.email),
    avatar: String(data?.data?.avatar),
    phone: String(data.data?.phone),
    role: data.data?.role as Role,
    isVerified: data.data?.isVerified as boolean,
    gender: data.data?.gender as Gender,
  };

  return (
    <div className="w-full min-h-full">
      <StoreProviders initialAuth={initialAuth}>
        <AppNavbar />
        {children}
      </StoreProviders>
    </div>
  );
}

export default layout;
