import freshoraLogo from "@/public/freshora-logo/freshora-logo.png";
import Button from "@/shared/components/Button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function page() {
  return (
    <main className="h-dvh flex justify-center items-center">
      <div className="flex items-center flex-col gap-4 md:w-60 sm:w-[50%] w-[90%]">
        <Link href="/">
          <Image
            src={freshoraLogo}
            alt="freshora-logo"
            width={250}
            className="pb-5"
          />
        </Link>
        <Button
          btnType="primary"
          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
          Register with Google
        </Button>

        <Button btnType="secondary" href="/signup/credentials">
          Register with Email
        </Button>

        <div className="flex gap-1">
          <p className="text-xs text-brand-mist-700">
            Already have an account?
          </p>
          <Link
            href="/login"
            className="text-xs cursor-pointer text-brand-emerald-700">
            Login.
          </Link>
        </div>
      </div>
    </main>
  );
}

export default page;
