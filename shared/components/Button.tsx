interface ButtonProps {
  href?: string;
  children?: React.ReactNode;
  btnType: "primary" | "secondary";
}

function SubmitButton({ href, btnType, children }: ButtonProps) {
  const basedStyle = "w-full h-10 flex items-center justify-center";

  const styles: Record<string, string> = {
    primary:
      basedStyle +
      " bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 cursor-pointer",
  };

  return (
    <button type="button" className={styles[btnType]}>
      {children}
    </button>
  );
}

export default SubmitButton;
