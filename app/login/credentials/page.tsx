import Link from "next/link";

function page() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <div className="pb-10 text-2xl text-brand-mist-600">
        <h1>Login</h1>
      </div>

      <div className="flex flex-col gap-4 md:w-75">
        <form className="flex flex-col gap-4">
          <div>
            <input
              name="email"
              type="text"
              placeholder="Enter email"
              className="input w-full border border-barnd-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
            />
          </div>

          <button
            // onClik={}
            className="w-full h-10 flex items-center justify-center bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800">
            Login
          </button>
        </form>
        <Link
          href="/login"
          className="w-full h-10 flex items-center justify-center border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200">
          Back to login options
        </Link>
      </div>
    </main>
  );
}

export default page;
