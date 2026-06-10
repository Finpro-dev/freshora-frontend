import Link from "next/link";
import SignupForm from "./_components/SignupForm";
import Button from "@/shared/components/Button";

function page() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <div className="font-sans pb-10 text-2xl text-brand-mist-600">
        <h1>Quick Signup</h1>
      </div>

      <div className="flex flex-col gap-4 md:w-[80%] sm:w-[65%] w-[80%]">
        <SignupForm />
        <Button btnType="secondary" href="/signup">
          Back to signup options
        </Button>
      </div>
    </main>
  );
}

export default page;
