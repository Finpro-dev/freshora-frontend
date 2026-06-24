"use client";

import { useInitializeUserLocation } from "./use-get-intitial-user-location";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLocating } = useInitializeUserLocation();

  if (isLocating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="animate-pulse text-xs font-bold uppercase tracking-widest text-brand-mist-500">
          Initializing global store allocation...
        </p>
      </div>
    );
  }

  return <section>{children}</section>;
}
