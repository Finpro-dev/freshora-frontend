import CreatePassword from "@/shared/components/CreatePassword";
import VerifyOnly from "./_components/VerifyOnly";
import { createPassword } from "@/actions/create-new-password";

type SearchParams = Promise<Record<string, string>>;

async function page({ searchParams }: { searchParams: SearchParams }) {
  const { verifyType } = await searchParams;

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <div className="pb-10 text-2xl text-brand-mist-600">
        <h1>
          {verifyType === "VERIFY_PASSWORD"
            ? "Create new password"
            : "Verify your email"}
        </h1>
      </div>

      <div className="flex flex-col gap-4 md:w-75 sm:w-[60%] w-[80%]">
        {verifyType === "VERIFY_PASSWORD" ? (
          <CreatePassword handleSubmitPassword={createPassword} />
        ) : (
          <VerifyOnly />
        )}
      </div>
    </main>
  );
}

export default page;
