import LoginForm from "./_components/LoginForm";
import Button from "@/shared/components/Button";

function page() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <div className="pb-10 text-2xl text-brand-mist-600">
        <h1>Login</h1>
      </div>

      <div className="flex flex-col gap-4 md:w-75 sm:w-[60%] w-[80%]">
        <LoginForm />
        <Button btnType="secondary" href="/login">
          Back to login options
        </Button>
      </div>
    </main>
  );
}

export default page;
