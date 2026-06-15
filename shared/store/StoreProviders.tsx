import { AuthStates } from "@/shared/store/auth-store/auth-store";
import AuthStoreProvider from "@/shared/store/auth-store/AuthStoreProvider";
import CartStoreProvider from "@/shared/store/cart-store/CartStoreProvider";
import { CartStates } from "@/shared/store/cart-store/cart-store";

interface ProviderProps {
  children: React.ReactNode;
  initialAuth: AuthStates;
  initialCart: CartStates;
}

function StoreProviders({ initialAuth, initialCart, children }: ProviderProps) {
  return (
    <AuthStoreProvider initialAuth={initialAuth}>
      <CartStoreProvider initialCart={initialCart}>{children}</CartStoreProvider>
    </AuthStoreProvider>
  );
}

export default StoreProviders;
