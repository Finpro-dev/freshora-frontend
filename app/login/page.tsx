import freshoraLogo from "@/public/freshora-logo/freshora-logo.png";
import Button from "@/shared/components/Button";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

async function page() {
  return (
    <main className="h-dvh flex justify-center items-center">
      <div className="flex items-center flex-col gap-4 md:w-60 sm:w-[50%] w-[90%]">
        <Image
          src={freshoraLogo}
          alt="freshora-logo"
          width={250}
          className="pb-5"
        />
        <Button
          btnType="primary"
          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
          Continue with Google
        </Button>

        <Button btnType="secondary" href="/login/credentials">
          Continue with Email
        </Button>
      </div>
    </main>
  );
}

export default page;
