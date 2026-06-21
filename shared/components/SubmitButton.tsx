import Button from "./Button";

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
    <Button
      btnType="primary"
      disabled={isSubmitting}
      pendingLabel="Submitting..."
      type="submit">
      {isSubmitting ? pendingLabel : children}
    </Button>
  );
}

export default SubmitButton;
