"use client";

import Link from "next/link";
import { type AuthNavigationProps } from "../_types/auth-navigation-types";

function AuthNavigation({
  onShowPassword,
  isShowPassword,
}: AuthNavigationProps) {
  return (
    <div>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-1">
          <p className="text-xs text-brand-mist-700 ">Forgot password?</p>{" "}
          <Link
            href="/reset-password/request"
            className="text-xs cursor-pointer text-brand-emerald-700">
            Reset.
          </Link>
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

      <div className="flex gap-1">
        <p className="text-xs text-brand-mist-700">
          Don&apos;t have an account?
        </p>
        <Link
          href="/login"
          className="text-xs cursor-pointer text-brand-emerald-700">
          Create.
        </Link>
      </div>
    </div>
  );
}

export default AuthNavigation;
