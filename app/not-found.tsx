import Button from "@/shared/components/Button";
import Link from "next/link";

export default function NotFound() {
  // Menyamakan layouting tombol menggunakan style dasar dari komponen Button lo
  const basedButtonStyle =
    "h-10 flex items-center justify-center px-4 font-medium transition-colors duration-200 text-sm";

  const primaryBtnStyle =
    basedButtonStyle +
    " bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800";

  const secondaryBtnStyle =
    basedButtonStyle +
    " border border-brand-mist-300 text-brand-mist-700 hover:bg-brand-mist-200";

  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-brand-emerald-700">404</p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-mist-700 sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-6 text-base leading-7 text-brand-mist-500 max-w-md mx-auto">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved, deleted, or perhaps never existed.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" btnType="primary">
            Go back home
          </Button>
        </div>
      </div>
    </main>
  );
}
