"use client";

import React from "react";
import { useInitializeUserLocation } from "./use-get-intitial-user-location";

interface ProductLayoutProps {
  children: React.ReactNode;
}

function ProductLayout({ children }: ProductLayoutProps) {
  const { nearestStoreId } = useInitializeUserLocation();

  console.log(nearestStoreId);
  return (
    <section className="w-full min-h-screen bg-color-background text-color-foreground antialiased">
      {children}
    </section>
  );
}

export default ProductLayout;
