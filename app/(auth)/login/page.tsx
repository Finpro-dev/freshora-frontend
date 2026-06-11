import freshoraLogo from "@/public/freshora-logo/freshora-logo.png";
import Button from "@/shared/components/Button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

async function page() {
  return (
    <main className="h-dvh w-full flex justify-center items-center">
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
          Continue with Google
        </Button>

        <Button btnType="secondary" href="/login/credentials">
          Continue with Email
        </Button>

        <div className="flex gap-1 text-xs">
          <p className="text-xs text-brand-mist-700">
            Don&apos;t have an account?
          </p>
          <Button
            btnType="text"
            href="/signup"
            textColor="text-brand-emerald-700"
            hoverTextColor="text-brand-emerald-800">
            Create.
          </Button>
        </div>
      </div>
    </main>
  );
}

export default page;
