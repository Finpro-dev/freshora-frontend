"use client";

import Link from "next/link";

function SearchRecommendations({ data }: any) {
  return (
    data?.length && (
      <div className="absolute top-11 z-100 h-50 w-full bg-brand-mist-300 px-2 ">
        <ul className="flex flex-col gap-3">
          {data?.map((data: any, index: number) => (
            <Link
              key={index}
              href={`/product/${data.href}`}
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
