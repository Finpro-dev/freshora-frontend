"use client";

import { AuthStates } from "@/shared/store/auth-store/auth-store";
import AuthStoreProvider from "@/shared/store/auth-store/AuthStoreProvider";
import UserAddressStoreProvider from "./user-address-store/UserAddressProvider";
import CartStoreProvider from "@/shared/store/cart-store/CartStoreProvider";
import { CartStates } from "@/shared/store/cart-store/cart-store";
import UserCoordinatesStoreProvider from "./user-coordinates-store/UserCoordinatesProvider";
import AppWrapper from "@/app/(main)/_components/AppWrapper";

interface ProviderProps {
  children: React.ReactNode;
  initialAuth: AuthStates;
  initialCart: CartStates;
}

function StoreProviders({ initialAuth, initialCart, children }: ProviderProps) {
  return (
    <AuthStoreProvider initialAuth={initialAuth}>
      <UserAddressStoreProvider>
        <CartStoreProvider initialCart={initialCart}>
          <UserCoordinatesStoreProvider>
            <AppWrapper>{children}</AppWrapper>
          </UserCoordinatesStoreProvider>
        </CartStoreProvider>
      </UserAddressStoreProvider>
    </AuthStoreProvider>
  );
}

export default StoreProviders;
