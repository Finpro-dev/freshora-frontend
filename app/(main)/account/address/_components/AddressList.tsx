import { getUserAddresses } from "@/actions/user-addresses";
import { Address } from "@/shared/types/address-type";
import AddressCard from "./AddressCard";
import ZeroAddress from "./ZeroAddress";

async function AddressList() {
  const res = await getUserAddresses();
  const userAddresses: Address[] = res?.data;

  if (!userAddresses?.length) return <ZeroAddress />;

  return (
    <div className="h-[60%] space-y-4 sm:h-100 overflow-y-auto px-3 py-3 shadow-sm shadow-brand-mist-300 border border-brand-mist-100 rounded-xl">
      {userAddresses?.map((address, i) => (
        <AddressCard key={i} data={address} />
      ))}
    </div>
  );
}

export default AddressList;
