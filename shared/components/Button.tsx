import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  btnType: "primary" | "secondary" | "danger" | "primaryRounded" | "text";
  pendingLabel?: string;
  disabled?: boolean;
  textColor?: string;
  hoverTextColor?: string;
  children?: React.ReactNode;
}

function Button({
  href,
  btnType = "primary",
  pendingLabel = "Hold on...",
  textColor = "text-emerald-600",
  hoverTextColor = "text-emerald-800",
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  const basedStyle =
    "w-full h-10 flex items-center justify-center cursor-pointer px-4";

  const styles: Record<string, string> = {
    primary:
      basedStyle +
      " bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 cursor-pointer disabled:bg-brand-mist-500 disabled:cursor-not-allowed",
    secondary:
      basedStyle +
      " border border-brand-mist-300 text-foreground hover:bg-brand-mist-200 disabled:bg-brand-mist-500 disabled:cursor-not-allowed",
    danger:
      basedStyle +
      " bg-red-200/50 border border-red-300 text-foreground hover:bg-red-200 disabled:bg-red-500 disabled:cursor-not-allowed",

    primaryRounded:
      basedStyle +
      " rounded-md bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 cursor-pointer disabled:bg-brand-mist-500 disabled:cursor-not-allowed",

    text: `${textColor} hover:${hoverTextColor} hover:underline hover:cursor-pointer`,
  };

  if (href) {
    return (
      <Link href={href} className={styles[btnType]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={styles[btnType]}
      {...props}>
      {disabled ? pendingLabel : children}
    </button>
  );
}

export default Button;
