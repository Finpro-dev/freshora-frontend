"use client";

function StoreMapSkeleton() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700">
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/20 to-transparent" />

      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="map-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#map-grid)"
            className="text-gray-600 dark:text-gray-300"
          />
        </svg>
      </div>

      {/* Center Pin Indicator (Animated Pulse) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-red-500 animate-pulse drop-shadow-lg">
        📍
      </div>

      <div className="absolute top-4 left-4 flex flex-col space-y-1">
        <div className="w-10 h-10 rounded-md bg-gray-300 dark:bg-gray-600 shadow-md" />
        <div className="w-10 h-10 rounded-md bg-gray-300 dark:bg-gray-600 shadow-md" />
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500 bg-white/60 dark:bg-black/40 px-2 py-1 rounded select-none">
        <span className="animate-pulse">Loading map metadata...</span>
      </div>
    </div>
  );
}

export default StoreMapSkeleton;
