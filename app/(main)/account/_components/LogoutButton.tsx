"use client";

import { logoutUser } from "@/actions/logout-user";
import Button from "@/shared/components/Button";

function LogoutButton() {
  const handleLogoutUser = async () => {
    const res = await logoutUser();
    console.log("Res", res);
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
