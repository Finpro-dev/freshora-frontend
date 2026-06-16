"use client";

import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";
import { MdFormatListBulletedAdd } from "react-icons/md";

function CreateAddressButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("address/new")} btnType="primary">
      <span className="pr-2">
        <MdFormatListBulletedAdd className="text-2xl" />
      </span>
      Add Address
    </Button>
  );
}

export default CreateAddressButton;
