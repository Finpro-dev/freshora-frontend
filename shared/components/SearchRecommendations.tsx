"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SearchRecommendationType } from "../types/search-recommendation-type";

interface SearchRecommendationsProps {
  data: SearchRecommendationType[];
  isSearchRecommendationOpen: boolean;
  setSearchRecommendationOpen: Dispatch<SetStateAction<boolean>>;
}

function SearchRecommendations({
  data,
  isSearchRecommendationOpen,
  setSearchRecommendationOpen,
}: SearchRecommendationsProps) {
  const wrapper = useRef<HTMLDivElement>(null);

  const closeSelectBox = (e: MouseEvent): void => {
    if (wrapper.current && !wrapper.current?.contains(e.target as Node)) {
      setSearchRecommendationOpen(false);
    }
  };

  useEffect(() => {
    if (data?.length) setSearchRecommendationOpen(true);
  }, [wrapper, data]);

  useEffect(() => {
    document.addEventListener("click", closeSelectBox, true);
    return () => {
      document.removeEventListener("click", closeSelectBox, true);
    };
  }, [wrapper, closeSelectBox]);

  return (
    isSearchRecommendationOpen && (
      <div
        ref={wrapper}
        className="absolute top-11 z-100 h-50 w-full bg-brand-mist-300 px-2 ">
        <ul className="flex flex-col gap-3">
          {data?.map((data, index: number) => (
            <Link
              key={index}
              prefetch={false}
              href={`/products/${data.slug}`}
              className="text-brand-mist-500">
              {data?.name?.length > 30 ? data.name : data.name.slice(0, 30)} ...
            </Link>
          ))}
        </ul>
      </div>
    )
  );
}

export default SearchRecommendations;
