import { Suspense } from "react";
import AppLogo from "./AppLogo";
import AppNavbarLink from "./AppNavbarLink";
import AppNavbarProfile from "./AppNavbarProfile";
import AppSearchBar from "./AppSearchBar";
import { AppNavbarProfileSkeleton } from "./skeletons/AppNavbarProfileSkeleton";
import { cookies } from "next/headers";

async function AppNavbar() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const isLogin = accessToken || refreshToken;

  console.log("ISLOGIN", isLogin);

  return (
    <nav className="sticky top-0 z-50 h-15 sm:h-18 w-full flex gap-5 sm:gap-10 justify-between items-center px-5 sm:px-10 py-2 bg-brand-mist-200 shadow-md shadow-brand-mist-300">
      <AppLogo />
      <AppSearchBar />
      <AppNavbarLink>
        {/* //fixme ->> add toggle menu or login button */}
        {isLogin && (
          <Suspense fallback={<AppNavbarProfileSkeleton />}>
            <AppNavbarProfile />
          </Suspense>
        )}
      </AppNavbarLink>
    </nav>
  );
}

export default AppNavbar;
