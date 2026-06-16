import { MdDoNotDisturb } from "react-icons/md";

function ZeroAddress() {
  return (
    <div className="flex flex-col items-center justify-center h-100 space-y-4 overflow-y-auto px-3 py-3 shadow-sm shadow-brand-mist-300 border border-brand-mist-100 rounded-xl">
      <MdDoNotDisturb className="text-center text-brand-mist-300 text-4xl" />
      <p className="text-brand-mist-400 text-sm sm:text-base">
        You do not have any address yet.
      </p>
    </div>
  );
}

export default ZeroAddress;
