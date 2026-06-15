import { AuthStates } from "@/shared/store/auth-store/auth-store";
import AuthStoreProvider from "@/shared/store/auth-store/AuthStoreProvider";
import UserAddressStoreProvider from "./user-address-store/UserAddressProvider";

interface ProviderProps {
  children: React.ReactNode;
  initialAuth: AuthStates;
}

function StoreProviders({ initialAuth, children }: ProviderProps) {
  return (
    <AuthStoreProvider initialAuth={initialAuth}>
      <UserAddressStoreProvider>{children}</UserAddressStoreProvider>
    </AuthStoreProvider>
  );
}

export default StoreProviders;
