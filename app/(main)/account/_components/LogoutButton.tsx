"use client";

import { logoutUser } from "@/actions/logout-user";
import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface LogoutButtonProps {
  children: React.ReactNode;
}

function LogoutButton({ children }: LogoutButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleLogoutUser = async () => {
    startTransition(async () => {
      const toasterId = toast.loading("Logging out..");
      await logoutUser();
      router.push("/login");
      toast.success("Logout successful, see ya soon!", { id: toasterId });
    });
  };

  return (
    <form action={handleLogoutUser}>
      <Button
        disabled={isPending}
        pendingLabel="Logging out..."
        type="submit"
        btnType="danger">
        {children}
      </Button>
    </form>
  );
}

export default LogoutButton;
