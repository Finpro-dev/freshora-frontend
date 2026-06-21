import { AuthStates } from "@/shared/store/auth-store/auth-store";
import AuthStoreProvider from "@/shared/store/auth-store/AuthStoreProvider";
import StoreAddressStoreProvider from "./store-address-store/StoreAddressProvider";

interface DashboardStoreProvidersProps {
  children: React.ReactNode;
  initialAuth: AuthStates;
}

function DashboardStoreProviders({
  initialAuth,
  children,
}: DashboardStoreProvidersProps) {
  return (
    <AuthStoreProvider initialAuth={initialAuth}>
      <StoreAddressStoreProvider>{children}</StoreAddressStoreProvider>
    </AuthStoreProvider>
  );
}

export default DashboardStoreProviders;
