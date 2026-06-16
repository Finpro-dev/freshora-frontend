"use client";

import { deleteUserAddress } from "@/actions/delete-user-address";
import { editUserAddress } from "@/actions/edit-user-address";
import Button from "@/shared/components/Button";
import SpinnerMini from "@/shared/components/SpinnerMini";
import { useUserAddressStore } from "@/shared/store/user-address-store/UserAddressProvider";
import { Address } from "@/shared/types/address-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useGetCity } from "../../_hooks/use-get-city";
import { useGetDistrict } from "../../_hooks/use-get-district";
import { useGetProvinces } from "../../_hooks/use-get-provinces";
import { getIdAndNameLocation } from "../../_utils/get-id-and-name-location-util";
import {
  EditAddressInput,
  editAddressSchema,
} from "../_schemas/edit-address-schema";
import Swal from "sweetalert2";

interface EditAddressFormProps {
  address: Address;
}

function EditAddressForm({ address }: EditAddressFormProps) {
  const defaultValues = {
    address: address?.address ?? "",
    province: `${address?.provinceId ?? ""}%${address?.province ?? ""}`,
    city: `${address?.cityId ?? ""}%${address?.city ?? ""}`,
    district: `${address?.districtId ?? ""}%${address?.district ?? ""}`,
    postalCode: address?.postalCode ?? "",
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<EditAddressInput>({
    values: defaultValues,
    resolver: zodResolver(editAddressSchema),
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isMapTouched, setIsMapTouched] = useState(false);
  const {
    lat: latitude,
    lng: longitude,
    setCords,
    setError,
  } = useUserAddressStore((state) => state);

  // get all province data
  const { data: provinces } = useGetProvinces();
  const watchedProvince = watch("province");

  // get all cities based on selected province
  const { data: city } = useGetCity(String(watchedProvince));
  const watchedCity = watch("city");

  // get all districts based on selected city
  const { data: district } = useGetDistrict(String(watchedCity));

  const handleCreateAddress = handleSubmit(async (data) => {
    const { id: provinceId, name: province } = getIdAndNameLocation(
      String(data.province),
    );
    const { id: cityId, name: city } = getIdAndNameLocation(String(data.city));
    const { id: districtId, name: district } = getIdAndNameLocation(
      String(data.district),
    );

    const payload = {
      address: data.address as string,
      city: city as string,
      cityId: parseInt(cityId as string),
      district: district as string,
      districtId: parseInt(districtId as string),
      latitude,
      longitude,
      postalCode: data.postalCode,
      province: province as string,
      provinceId: parseInt(provinceId as string),
    };

    startTransition(async () => {
      const res = await editUserAddress(payload, address.addressId);
      if (!res?.success) {
        toast.error(res.error);
      } else {
        toast.success("Address modified successfully");
        setError(null);
        setCords({ lat: 43.21, lng: 0.123 });
        router.push("/account/address");
      }
    });
  });

  const handleDeleteAddress = async () => {
    Swal.fire({
      title: "Are you sure?",
      theme: "auto",
      text: "You won't be able to undo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009966",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUserAddress(address.addressId);

        if (!res?.success) {
          toast.error(res?.error);
        } else {
          toast.success("Address deleted successfully");
          setError(null);
          router.push("/account/address");
        }
      }
    });
  };

  // detect if the user has touched the map
  useEffect(() => {
    if (latitude === address?.latitude && longitude === address?.longitude) {
      setIsMapTouched(true);
    } else {
      setIsMapTouched(false);
    }
  }, [latitude, longitude]);

  return (
    <>
      <div>
        {/* form */}
        <form onSubmit={handleCreateAddress} className="flex flex-col gap-4">
          {/* full address */}
          <section className="w-full">
            <div className="text-xs sm:text-sm pb-2 text-brand-mist-400">
              <label>
                Full Address <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              {...register("address")}
              name="address"
              type="text"
              placeholder="Full address"
              className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400"
            />

            {errors.address && (
              <p className="pt-2 text-xs text-red-700">
                {errors.address.message}
              </p>
            )}
          </section>

          {/* district and city */}
          <section className="w-full flex md:flex-row flex-col gap-4">
            <div className="w-full">
              <div className="text-xs sm:text-sm pb-2 text-brand-mist-400">
                <label>
                  Province <span className="text-red-500">*</span>
                </label>
              </div>
              <select
                {...register("province")}
                name="province"
                className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400">
                <option disabled={true}>Province</option>
                {provinces?.data?.map((province: any, i: number) => (
                  <option key={i} value={`${province.id}%${province.name}`}>
                    {province.name}
                  </option>
                ))}
              </select>

              {errors.province && (
                <p className="pt-2 text-xs text-red-700">
                  {errors.province.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="text-xs sm:text-sm pb-2 text-brand-mist-400">
                <label>
                  City <span className="text-red-500">*</span>
                </label>
              </div>
              <select
                {...register("city")}
                name="city"
                className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400">
                {!city ? (
                  <option disabled={true}>Select province first</option>
                ) : (
                  <option disabled={true}>City</option>
                )}

                {city?.data &&
                  city?.data?.map((city: any, i: number) => (
                    <option key={i} value={`${city.id}%${city.name}`}>
                      {city.name}
                    </option>
                  ))}
              </select>

              {errors.city && (
                <p className="pt-2 text-xs text-red-700">
                  {errors.city.message}
                </p>
              )}
            </div>
          </section>

          {/* district and postal code */}
          <section className="w-full flex md:flex-row flex-col gap-4">
            <div className="w-full">
              <div className="text-xs sm:text-sm pb-2 text-brand-mist-400">
                <label>
                  District <span className="text-red-500">*</span>
                </label>
              </div>
              <select
                {...register("district")}
                name="district"
                className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400">
                {!district ? (
                  <option disabled={true}>Select city first</option>
                ) : (
                  <option disabled={true}>District</option>
                )}

                {district?.data &&
                  district?.data?.map((district: any, i: number) => (
                    <option key={i} value={`${district.id}%${district.name}`}>
                      {district.name}
                    </option>
                  ))}
              </select>

              {errors.district && (
                <p className="pt-2 text-xs text-red-700">
                  {errors.district.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="text-xs sm:text-sm pb-2 text-brand-mist-400">
                <label>
                  Postal Code <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                {...register("postalCode")}
                name="postalCode"
                type="text"
                placeholder="Postal code"
                className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400"
              />

              {errors.postalCode && (
                <p className="pt-2 text-xs text-red-700">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </section>

          {!Object.keys(dirtyFields).length && isMapTouched ? (
            <Button
              btnType="primary"
              pendingLabel="Start editing" // this will shows up in the UI before editing as disabled is always true
              disabled={true}
              type="button">
              Start editing
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isPending}
              btnType="primary"
              pendingLabel="Creating...">
              Save information
            </Button>
          )}
        </form>

        <form action={handleDeleteAddress} className="mt-2">
          <Button
            type="submit"
            pendingLabel={<SpinnerMini />}
            disabled={isPending}
            btnType="danger">
            Delete address
          </Button>
        </form>
      </div>
    </>
  );
}

export default EditAddressForm;
