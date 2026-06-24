"use client";

import { useUserCoordinatesStore } from "@/shared/store/user-coordinates-store/UserCoordinatesProvider";
import { StoreType } from "@/shared/types/store-types";
import CheckoutItemPreview from "./_components/CheckoutItemPreview";
import { useGetCartItems } from "./_hooks/use-get-all-cart-items";

import { useGetReferralVoucher } from "./_hooks/use-get-referral-voucher";
import { useGetStoreDetails } from "./_hooks/use-get-store-details";
import { useState } from "react";
import { useGetUserAddresses } from "./_hooks/use-get-user-addresses";
import { Address } from "@/shared/types/address-type";
import AddressDropdown from "./_components/AddressDropdown";
import CourierDropdown from "./_components/CourierDropdown";
import { calculateTotalWeight } from "./_utils/calculate-total-weight";
import { useGetShippingFee } from "./_hooks/use-calculate-shipping-fee";
import TransactionSummaryCard from "./_components/TransactionSummaryCard";
import { capitalize } from "@/shared/utils/capitalize";
import { useGetFreeShippingVoucher } from "./_hooks/use-get-free-shipping-voucher";

function Page() {
  const { data: cartData } = useGetCartItems();
  const { data: freeShippingVoucherData } = useGetFreeShippingVoucher();
  const { data: referralVoucherData } = useGetReferralVoucher();
  const nearestStoreId = useUserCoordinatesStore(
    (state) => state.nearestStoreId,
  );
  const { data: storeDetailsData } = useGetStoreDetails(nearestStoreId);
  const cartArr = cartData?.data?.cartItems;
  const storeDetails: StoreType = storeDetailsData?.data;
  const { data: addressesData } = useGetUserAddresses();
  const freeShippingVoucher = freeShippingVoucherData?.data;
  const referralVoucher = referralVoucherData?.data;
  const userAddresses: Address[] = addressesData?.data;
  const [activeCourier, setActiveCourier] = useState<string | null>(null);

  const [activeAddress, setActiveAddress] = useState<Address | null>(
    userAddresses?.[0],
  );

  const { totalWeightInGram } = calculateTotalWeight(cartArr);
  const { data: shippingFeeData, isLoading: isCalculateShippingFeeLoading } =
    useGetShippingFee(
      Number(activeAddress?.districtId),
      Number(storeDetails?.districtId),
      String(activeCourier),
      Number(totalWeightInGram),
    );

  const shippingFee = shippingFeeData?.shippingCost;

  return (
    <main>
      {/* cart list */}
      <div className="w-full p-4">
        <CheckoutItemPreview cartItems={cartArr} />
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        {/* address dropdown */}
        <div className="w-full md:w-[50%] p-6 bg-color-background">
          <AddressDropdown
            addresses={userAddresses}
            selectedAddress={activeAddress}
            onAddressChange={(selected) => setActiveAddress(selected)}
          />

          {activeAddress && (
            <div className="mt-4 p-3 text-xs border border-dashed border-brand-mist-300 text-brand-mist-500 rounded">
              Your selected City:{" "}
              <span className="font-mono font-bold text-brand-emerald-600">
                {capitalize(activeAddress.city)}
              </span>
            </div>
          )}
        </div>

        {/* courier */}
        <div className="w-full md:w-[50%] p-6 bg-color-background">
          <CourierDropdown
            selectedCourier={activeCourier}
            onCourierChange={(courier) => setActiveCourier(courier)}
          />

          {activeCourier && (
            <div className="mt-4 p-3 text-xs border border-dashed border-brand-mist-300 text-brand-mist-500 rounded">
              Your selected courier:{" "}
              <span className="font-mono font-bold uppercase text-brand-emerald-600">
                {capitalize(activeCourier)}
              </span>{" "}
            </div>
          )}
        </div>
      </div>

      {/* order summary */}
      <div className="p-4">
        <TransactionSummaryCard
          freeShippingVoucher={freeShippingVoucher}
          referralVoucher={referralVoucher}
          activeAddress={activeAddress}
          activeCourier={activeCourier}
          cartItems={cartArr}
          isCalculateShippingFeeLoading={isCalculateShippingFeeLoading}
          shippingFee={shippingFee}
        />
      </div>
    </main>
  );
}

export default Page;
