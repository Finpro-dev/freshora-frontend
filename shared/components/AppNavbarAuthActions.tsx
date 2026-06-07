import Button from "./Button";

function AppNavbarAuthActions() {
  return (
    <div className="flex gap-4">
      <Button btnType="secondary" href="/signup">
        Signup
      </Button>
      <Button btnType="primary" href="/login">
        Login
      </Button>
    </div>
  );
}

export default AppNavbarAuthActions;
