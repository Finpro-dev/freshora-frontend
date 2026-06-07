"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useSearchRecommendation } from "../hooks/use-search-recommendation";
import { searchRecommendationSchema } from "../schemas/search-recommendation-schema";
import SearchRecommendations from "./SearchRecommendations";

function AppSearchBar() {
  //fixme ->> show search in relevant page only
  const currentPath = usePathname();

  console.log(currentPath);

  const [isSearchRecommendationOpen, setSearchRecommendationOpen] =
    useState(false);

  const [rawSearch, setRawSearch] = useState("");
  const [search] = useDebounce(rawSearch, 800);
  const { data, isLoading } = useSearchRecommendation(search as string);
  console.log(search);
  return (
    <div className="relative w-full">
      <label className="input w-full border border-brand-mist-300 text-brand-mist-700 [outline:none] focus-within:[outline:none]">
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
          onChange={(e) => setRawSearch(e.target.value)}
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
