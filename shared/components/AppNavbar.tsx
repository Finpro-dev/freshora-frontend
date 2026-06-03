import AppLogo from "./AppLogo";
import AppNavbarLink from "./AppNavbarLink";
import AppSearchBar from "./AppSearchBar";

function AppNavbar() {
  return (
    <nav className="sticky top-0 z-50 h-15 sm:h-18 w-full flex gap-5 sm:gap-10 justify-between items-center px-5 sm:px-10 py-2 bg-brand-mist-200 shadow-md shadow-brand-mist-300">
      <AppLogo />
      <AppSearchBar />
      <AppNavbarLink />
    </nav>
  );
}

export default AppNavbar;
