import Link from "next/link";
import ResetPassword from "./_components/EmailInput";
import Button from "@/shared/components/Button";

function page() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <div className="pb-10 text-2xl sm:text-3xl md:font-semibold text-brand-mist-700">
        <h1>Input registered email</h1>
      </div>

      <div className="flex flex-col gap-4 md:w-75 sm:w-[60%] w-[80%]">
        <ResetPassword />

        <Button btnType="secondary" href="/login/credentials">
          Back to login
        </Button>
      </div>
    </main>
  );
}

export default page;
