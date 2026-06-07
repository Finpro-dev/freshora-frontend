"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { searchRecommendationSchema } from "../schemas/search-recommendation-schema";
import { useDebounce } from "use-debounce";
import { useSearchRecommendation } from "../hooks/use-search-recommendation";
import SearchRecommendations from "./SearchRecommendations";

function AppSearchBar() {
  const currentPath = usePathname();
  //fixme ->> show search in relevant page only

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchRecommendationSchema),
  });

  const rawSearch = watch("search");

  const [search] = useDebounce(rawSearch, 800);
  const { data, isLoading } = useSearchRecommendation(search as string);

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
          {...register("search")}
          type="search"
          required
          placeholder="Search"
        />
      </label>

      <SearchRecommendations data={data?.data} />
    </div>
  );
}

export default AppSearchBar;
