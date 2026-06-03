function AppSearchBar() {
  return (
    <label className="input w-full sm:w-70 md:w-75 lg:w-150 border border-brand-mist-300 text-brand-mist-700 [outline:none] focus-within:[outline:none]">
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
      <input type="search" required placeholder="Search" />
    </label>
  );
}

export default AppSearchBar;
