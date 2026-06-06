interface SubmitButtonProps {
  pendingLabel: string;
  children?: React.ReactNode;
  isSubmitting: boolean;
}

function SubmitButton({
  pendingLabel = "hold on...",
  isSubmitting,
  children,
}: SubmitButtonProps) {
  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className="w-full h-10 flex items-center justify-center bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 disabled:bg-brand-mist-500 cursor-pointer disabled:cursor-not-allowed">
      {isSubmitting ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
