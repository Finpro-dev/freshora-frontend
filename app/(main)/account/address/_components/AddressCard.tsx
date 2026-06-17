"use client";

import { setPrimaryAddress } from "@/actions/set-primary-address";
import Button from "@/shared/components/Button";
import SpinnerMini from "@/shared/components/SpinnerMini";
import { Address } from "@/shared/types/address-type";
import { capitalize } from "@/shared/utils/capitalize";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { TbBorderCornerSquare, TbMapPinCheck } from "react-icons/tb";
import { toast } from "sonner";

function AddressCard({ data }: { data: Address }) {
  const router = useRouter();
  const isPrimary = data.addressStatus === "PRIMARY";

  const handleSelectAddress = async () => {
    const res = await setPrimaryAddress(data.addressId);

    if (!res.success) {
      toast.error(res.error);
    } else {
      toast.success(`New primary address set successfully`);
    }
  };

  const [_state, formAction, isPending] = useActionState(
    handleSelectAddress,
    null,
  );

  return (
    <div
      onClick={() => router.push(`address/${data.addressId}`)}
      className={`relative w-full flex justify-between items-center gap-2 sm:gap-3 pr-5 pl-5 py-5 sm:pr-5 sm:pl-10 sm:py-5 rounded-sm shadow-sm shadow-brand-mist-300 border border-brand-mist-100 text-brand-mist-600 ${isPrimary ? "bg-brand-emerald-200/20 hover:bg-brand-emerald-200/30" : "hover:bg-brand-mist-100/50"} transition-all duration-300 cursor-pointer`}>
      {/* content */}
      <div>
        <div>
          <h4 className="text-lg sm:text-xl font-semibold mb-1">
            {capitalize(data.province)}
          </h4>
          <div className="absolute top-0 left-0">
            <TbBorderCornerSquare className="text-brand-emerald-600 sm:text-4xl text-3xl" />
          </div>
        </div>

        <div className="sm:text-base text-sm">
          <p className="mb-1 text-brand-mist-700">{data.postalCode}</p>
          <p className="text-brand-mist-500">
            {capitalize(data.address)}, {capitalize(data.district)},{" "}
            {capitalize(data.city)}
          </p>
        </div>
      </div>
      {/* button */}
      {isPrimary ? (
        <div>
          <TbMapPinCheck className="text-brand-emerald-700 text-2xl sm:text-3xl" />
        </div>
      ) : (
        <div>
          <form action={formAction}>
            <Button
              type="submit"
              onClick={(e) => e.stopPropagation()}
              pendingLabel={<SpinnerMini />}
              disabled={isPending}
              btnType="primary">
              Select
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddressCard;
