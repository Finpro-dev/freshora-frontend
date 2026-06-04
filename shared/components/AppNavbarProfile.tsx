import Image from "next/image";
import { CORS_CREDENTIALS } from "../config/dotenv-config";
import { cookies } from "next/headers";
import { ApiResponse } from "../types/api-type";
import { User } from "../types/user-type";
import Link from "next/link";
import defaultUserProfile from "@/public/user/default-user-profile.png";

const getUserProfile = async (): Promise<ApiResponse<User>> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const res = await fetch(`${CORS_CREDENTIALS.API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Cookie: allCookies,
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

async function AppNavbarProfile() {
  const data = await getUserProfile();
  const avatar = data.data?.avatar || defaultUserProfile;

  return (
    <Link href="/profile">
      <div className="relative w-8 sm:w-10 h-8 sm:h-10 border-2 rounded-full border-mist-200 ring-3 ring-brand-emerald-700 overflow-hidden">
        <Image
          src={avatar}
          alt="Logo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </Link>
  );
}

export default AppNavbarProfile;
