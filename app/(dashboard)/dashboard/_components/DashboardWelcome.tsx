"use client";

interface DashboardWelcomeProps {
  firstName: string;
  lastName: string;
  role: string;
}

export default function DashboardWelcome({
  firstName,
  lastName,
  role,
}: DashboardWelcomeProps) {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const roleLabel = role
    ? role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "User";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
      <div>
        <h1 className="text-2xl font-bold text-brand-mist-800">
          {greeting()}, {firstName} {lastName}
        </h1>
        <p className="text-sm text-brand-mist-500">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-emerald-100 text-brand-emerald-700 w-fit">
        {roleLabel}
      </span>
    </div>
  );
}
