import { AuthStates } from "@/shared/store/auth-store/auth-store";
import AuthStoreProvider from "@/shared/store/auth-store/AuthStoreProvider";

interface ProviderProps {
  children: React.ReactNode;
  initialAuth: AuthStates;
}

function StoreProviders({ initialAuth, children }: ProviderProps) {
  return (
    <AuthStoreProvider initialAuth={initialAuth}>{children}</AuthStoreProvider>
  );
}

export default StoreProviders;
