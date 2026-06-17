"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Force browser window container to absolute top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
