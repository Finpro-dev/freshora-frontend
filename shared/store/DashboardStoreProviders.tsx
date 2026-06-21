import { AuthStates } from "@/shared/store/auth-store/auth-store";
import AuthStoreProvider from "@/shared/store/auth-store/AuthStoreProvider";

interface DashboardStoreProvidersProps {
  children: React.ReactNode;
  initialAuth: AuthStates;
}

function DashboardStoreProviders({
  initialAuth,
  children,
}: DashboardStoreProvidersProps) {
  return (
    <AuthStoreProvider initialAuth={initialAuth}>{children}</AuthStoreProvider>
  );
}

export default DashboardStoreProviders;
