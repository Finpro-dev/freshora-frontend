"use client";

import { logoutUser } from "@/actions/logout-user";
import Button from "@/shared/components/Button";
import { redirect, useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();
  const handleLogoutUser = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <form action={handleLogoutUser}>
      <Button pendingLabel="Logging out..." type="submit" btnType="danger">
        Logout
      </Button>
    </form>
  );
}

export default LogoutButton;
