import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  btnType: "primary" | "secondary";
  pendingLabel?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

function Button({
  href,
  btnType = "primary",
  pendingLabel = "Hold on...",
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  const basedStyle =
    "w-full h-10 flex items-center justify-center cursor-pointer";

  const styles: Record<string, string> = {
    primary:
      basedStyle +
      " bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 cursor-pointer disabled:bg-brand-mist-500 disabled:cursor-not-allowed",
    secondary:
      basedStyle +
      " border border-brand-mist-300 text-foreground hover:bg-brand-mist-200 disabled:bg-brand-mist-500 disabled:cursor-not-allowed",
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
