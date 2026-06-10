import VerifyCreatePasswordForm from "./_components/VerifyCreatePasswordForm";
import VerifyOnly from "./_components/VerifyOnly";

type SearchParams = Promise<Record<string, string>>;

async function page({ searchParams }: { searchParams: SearchParams }) {
  const { verifyType } = await searchParams;

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <div className="pb-10 text-2xl sm:text-3xl font-semibold text-brand-mist-700">
        <h1>
          {verifyType === "VERIFY_PASSWORD"
            ? "Create new password"
            : "Verify your email"}
        </h1>
      </div>

      <div className="flex flex-col gap-4 md:w-75 sm:w-[60%] w-[80%]">
        {verifyType === "VERIFY_PASSWORD" ? (
          <VerifyCreatePasswordForm />
        ) : (
          <VerifyOnly />
        )}
      </div>
    </main>
  );
}

export default page;
