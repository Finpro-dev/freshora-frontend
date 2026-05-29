import Image from "next/image";
import Link from "next/link";
import freshoraLogo from "@/public/freshora-logo/freshora-logo.png";

function page() {
  return (
    <main className="h-dvh flex justify-center items-center">
      <div className="flex items-center flex-col gap-4 md:w-[50%] w-[90%]">
        <Image
          src={freshoraLogo}
          alt="freshora-logo"
          width={250}
          className="pb-5"
        />
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
          className="w-60 h-10 flex items-center justify-center bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800">
          Continue with Google
        </Link>

        <Link
          href="/login/credentials"
          className="w-60 h-10 flex items-center justify-center border border-brand-mist-300 text-foreground hover:bg-brand-mist-200">
          Continue with Email
        </Link>
      </div>
    </main>
  );
}

export default page;
