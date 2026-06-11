"use client";

import Button from "@/shared/components/Button";
import { useLogoutUser } from "../_hooks/use-logout-user";

function LogoutButton() {
  const { mutate, isPending } = useLogoutUser();
  return (
    <Button
      pendingLabel="Logging out..."
      disabled={isPending}
      onClick={() => mutate()}
      btnType="danger">
      Logout
    </Button>
  );
}

export default LogoutButton;
