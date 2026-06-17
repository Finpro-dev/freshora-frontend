"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchRecommendation } from "../hooks/use-search-recommendation";
import { formatSearch } from "../utils/format-search-util";
import { showSearchbarChecker } from "../utils/show-searchbar-checker-util";
import SearchRecommendations from "./SearchRecommendations";

function AppSearchBar() {
  const currentPath = usePathname();
  const isShowSearchBar = showSearchbarChecker(currentPath);

  const [isSearchRecommendationOpen, setSearchRecommendationOpen] =
    useState(false);
  const [rawSearch, setRawSearch] = useState("");
  const [search] = useDebounce(formatSearch(rawSearch), 300);
  const { data, isLoading } = useSearchRecommendation(search as string);

  if (!isShowSearchBar) return null;

  return (
    <div className="relative w-full md:w-60 lg:w-100">
      <label className="input w-full border border-brand-mist-300 rounded-full text-brand-mist-700 [outline:none] focus-within:[outline:none]">
        <svg
          className="h-[1.5em] sm:h-[2em] opacity-50 text-brand-mist-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onChange={(e) => {
            setRawSearch(e.target.value);
            setSearchRecommendationOpen(true);
          }}
          type="search"
          required
          placeholder="Search"
        />
      </label>
      <SearchRecommendations
        data={data?.data}
        isSearchRecommendationOpen={isSearchRecommendationOpen}
        setSearchRecommendationOpen={setSearchRecommendationOpen}
      />
    </div>
  );
}

export default AppSearchBar;
