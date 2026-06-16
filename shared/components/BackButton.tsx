"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

interface BackButtonProps {
  onBack?: () => void;
}

function BackButton({ onBack }: BackButtonProps) {
  const router = useRouter();
  const handlePreviousPage = () => {
    router.back();
  };
  return (
    <div
      onClick={onBack || handlePreviousPage}
      className="flex gap-3 items-center text-brand-mist-600 cursor-pointer hover:text-brand-emerald-500">
      <IoIosArrowBack className="text-2xl font-light" />
      <p>Previous page</p>
    </div>
  );
}

export default BackButton;
