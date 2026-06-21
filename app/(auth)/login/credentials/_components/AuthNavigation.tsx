"use client";

import Link from "next/link";
import { type AuthNavigationProps } from "../_types/auth-navigation-types";
import Button from "@/shared/components/Button";

function AuthNavigation({
  onShowPassword,
  isShowPassword,
}: AuthNavigationProps) {
  return (
    <div>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-1 text-xs ">
          <p className="text-brand-mist-700 ">Forgot password?</p>{" "}
          <Button
            btnType="text"
            href="/reset-password/request"
            textColor="text-brand-emerald-700"
            hoverTextColor="text-brand-emerald-800">
            Reset.
          </Button>
        </div>

        <div>
          <button
            type="button"
            onClick={onShowPassword}
            className="text-xs text-brand-mist-700 cursor-pointer">
            {isShowPassword ? "Hide password" : "Show password"}
          </button>
        </div>
      </div>

      <div className="flex gap-1 text-xs ">
        <p className="text-brand-mist-700">Don&apos;t have an account?</p>
        <Button
          btnType="text"
          href="/signup"
          textColor="text-brand-emerald-700"
          hoverTextColor="text-brand-emerald-800">
          Create.
        </Button>
      </div>
    </div>
  );
}

export default AuthNavigation;
