import Link from "next/link";

function page() {
  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <h1>Thank you!</h1>
      <p>Please check registered email to verify your account</p>
      {/* //fixme */}
      <Link href="/">Back to homepage</Link>
    </div>
  );
}

export default page;
