import Link from "next/link";

interface UserConfigBarProps {
  to: string;
  label: string;
  children: React.ReactNode;
}

function UserConfigBar({ to, label, children }: UserConfigBarProps) {
  return (
    <Link
      href={to}
      className="block mt-5 px-3 sm:px-5 py-3 sm:py-5 text-sm sm:text-base rounded-sm shadow-sm shadow-brand-mist-300 border border-brand-mist-100 hover:bg-brand-mist-100/30 text-brand-mist-600">
      <div className="flex gap-3 items-center">
        {children}
        <p>{label}</p>
      </div>
    </Link>
  );
}

export default UserConfigBar;
