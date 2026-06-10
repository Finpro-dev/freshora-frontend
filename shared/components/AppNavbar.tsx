import { Suspense } from "react";
import AppLogo from "./AppLogo";
import AppNavbarLink from "./AppNavbarLink";
import AppNavbarProfile from "./AppNavbarProfile";
import AppSearchBar from "./AppSearchBar";
import { AppNavbarProfileSkeleton } from "./skeletons/AppNavbarProfileSkeleton";
import { cookies } from "next/headers";
import AppNavbarAuthActions from "./AppNavbarAuthActions";

async function AppNavbar() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const isLogin = accessToken || refreshToken;

  return (
    <nav className="sticky top-0 z-50 h-15 sm:h-18 w-full flex gap-5 md:gap-8 lg:gap-10 justify-between items-center px-5 sm:px-10 py-2 bg-brand-mist-200 shadow-md shadow-brand-mist-300/30">
      <AppLogo />
      <AppSearchBar />
      {isLogin ? (
        <AppNavbarLink>
          <Suspense fallback={<AppNavbarProfileSkeleton />}>
            <AppNavbarProfile />
          </Suspense>
        </AppNavbarLink>
      ) : (
        <AppNavbarAuthActions />
      )}
    </nav>
  );
}

export default AppNavbar;
