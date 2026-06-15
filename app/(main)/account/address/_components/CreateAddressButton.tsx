"use client";

import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";

function CreateAddressButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("address/new")} btnType="primary">
      Create Address
    </Button>
  );
}

export default CreateAddressButton;
