import Link from "next/link";
import ResetPassword from "./_components/ResetPassword";

function page() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <div className="pb-10 text-2xl text-brand-mist-600">
        <h1>Verify your email</h1>
      </div>

      <div className="flex flex-col gap-4 md:w-75 sm:w-[60%] w-[80%]">
        <ResetPassword />
        <Link
          href="/login/credentials"
          className="w-full h-10 flex items-center justify-center border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200">
          Back to login
        </Link>
      </div>
    </main>
  );
}

export default page;
