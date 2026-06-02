import Link from "next/link";
import SignupForm from "./_components/SignupForm";

function page() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <div className="font-sans pb-10 text-2xl text-brand-mist-600">
        <h1>Quick Signup</h1>
      </div>

      <div className="flex flex-col gap-4 lg:w-[40%] md:w-[55%] sm:w-[65%] w-[80%]">
        <SignupForm />
        <Link
          href="/signup"
          className="w-full h-10 flex items-center justify-center border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200">
          Back to signup options
        </Link>
      </div>
    </main>
  );
}

export default page;
