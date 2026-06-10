import { showSearchBarLocationStatic } from "../statics/show-app-navbar-search-static";

export const showSearchbarChecker = (url: string): boolean => {
  const pathname = url.split("?")[0];
  const urlArr = pathname.split("/");
  const primaryRoute = urlArr[1];

  return (
    primaryRoute === "" || showSearchBarLocationStatic.includes(primaryRoute)
  );
};
