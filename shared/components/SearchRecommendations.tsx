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

  // remove the SR after clicking the link
  const handleClickRecommendation = () => {
    setSearchRecommendationOpen(false);
  };

  const closeSelectBox = (e: MouseEvent): void => {
    if (wrapper.current && !wrapper.current?.contains(e.target as Node)) {
      setSearchRecommendationOpen(false);
    }
  };

  // SR is open if there's data
  useEffect(() => {
    if (data?.length) setSearchRecommendationOpen(true);
  }, [wrapper, data]);

  // SR close outside of the element click
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
        className="absolute top-12 z-100 h-50 w-full bg-brand-mist-100 border border-brand-mist-400 px-2 py-2 text-brand-mist-600 rounded-sm">
        {data?.length ? (
          <ul className="flex flex-col gap-2">
            {data?.map((data, index: number) => (
              <Link
                onClick={handleClickRecommendation}
                key={index}
                prefetch={false}
                href={`/products/${data.slug}`}
                className="hover:text-brand-emerald-700">
                {data?.name?.length > 30 ? data.name : data.name.slice(0, 30)}{" "}
                ...
              </Link>
            ))}
          </ul>
        ) : (
          <p>No result</p>
        )}
      </div>
    )
  );
}

export default SearchRecommendations;
