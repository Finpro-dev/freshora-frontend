"use client";

import Button from "@/shared/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useGetCity } from "../_hooks/use-get-city";
import { useGetDistrict } from "../_hooks/use-get-district";
import { useGetProvinces } from "../_hooks/use-get-provinces";
import {
  CreateAddressInput,
  createAddressSchema,
} from "../_schemas/create-address-schema";
import { createNewAddress } from "@/actions/create-new-address";
import { getIdAndNameLocation } from "../_utils/get-id-and-name-location-util";
import { useUserAddressStore } from "@/shared/store/user-address-store/UserAddressProvider";
import { toast } from "sonner";

function CreateAddressForm() {
  const defaultValues = {
    province: "2%MALUKU",
    city: "11%AMBON",
    district: null,
    postalCode: "",
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAddressInput>({
    defaultValues,
    resolver: zodResolver(createAddressSchema),
  });

  const { lat: latitude, lng: longitude } = useUserAddressStore(
    (state) => state,
  );

  const { data: provinces } = useGetProvinces();
  const watchedProvince = watch("province");
  const { data: city } = useGetCity(String(watchedProvince));
  const watchedCity = watch("city");
  const { data: district } = useGetDistrict(String(watchedCity));

  // fixme ->> useme
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

    const res = await createNewAddress(payload);

    if (!res.success) {
      toast.success("New address created successfully");
    } else {
      toast.error(res.error);
    }
  });

  return (
    <>
      <div>
        {/* form */}
        <form onSubmit={handleCreateAddress} className="flex flex-col gap-4">
          {/* full address */}
          <section className="w-full">
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
              <select
                {...register("province")}
                name="province"
                defaultValue="Pick a color"
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
              <select
                {...register("city")}
                name="city"
                defaultValue="Pick a color"
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
              <select
                {...register("district")}
                name="district"
                defaultValue="Pick a color"
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

          <Button type="submit" btnType="primary">
            Create new address
          </Button>
        </form>
      </div>
    </>
  );
}

export default CreateAddressForm;
