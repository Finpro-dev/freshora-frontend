import { Suspense } from "react";
import ResetPasswordForm from "./_components/ResetPasswordForm";
import Spinner from "@/shared/components/Spinner";

function page() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <div className="pb-10 text-2xl sm:text-3xl md:font-semibold text-brand-mist-700">
        <h1>Create new password</h1>
      </div>

      <div className="flex flex-col gap-4 md:w-75 sm:w-[60%] w-[80%]">
        <Suspense fallback={<Spinner />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}

export default page;
