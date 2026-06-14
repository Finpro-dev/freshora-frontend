import { getUserAddresses } from "@/actions/user-addresses";
import AddressCard from "./AddressCard";
import { ApiResponse } from "@/shared/types/api-type";
import { Address } from "@/shared/types/address-type";

async function AddressList() {
  const res = await getUserAddresses();
  console.log("Address Res", res);
  const userAddresses: Address[] = res.data;

  return (
    <div className="h-[60%] space-y-4 sm:h-100 overflow-y-auto px-3 py-3 shadow-sm shadow-brand-mist-300 border border-brand-mist-100 rounded-xl">
      {userAddresses?.map((address, i) => (
        <AddressCard key={i} data={address} />
      ))}
    </div>
  );
}

export default AddressList;
