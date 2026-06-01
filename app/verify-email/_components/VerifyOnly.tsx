function VerifyOnly() {
  const handleVerifyEmail = async () => {
    "use server";
  };
  return (
    <button
      onClick={handleVerifyEmail}
      className="w-full h-10 flex items-center justify-center bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 disabled:bg-brand-mist-500 cursor-pointer">
      Yes, it&apos;s me
    </button>
  );
}

export default VerifyOnly;
