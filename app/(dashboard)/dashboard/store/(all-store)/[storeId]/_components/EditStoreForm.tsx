"use client";

import { useGetCity } from "@/app/(main)/account/address/_hooks/use-get-city";
import { useGetDistrict } from "@/app/(main)/account/address/_hooks/use-get-district";
import { useGetProvinces } from "@/app/(main)/account/address/_hooks/use-get-provinces";
import { getIdAndNameLocation } from "@/app/(main)/account/address/_utils/get-id-and-name-location-util";
import defaultStoreAvatar from "@/public/store/default-store-avatar-1.jpeg";
import Button from "@/shared/components/Button";
import SpinnerMini from "@/shared/components/SpinnerMini";
import {
  AVATAR_IMAGE_TYPES,
  MAX_AVATAR_IMAGE_SIZE,
} from "@/shared/statics/file-upload-config-static";
import { useStoreAddressStore } from "@/shared/store/store-address-store/StoreAddressProvider";
import { StoreType } from "@/shared/types/store-types";
import { UnassignedStoreAdmin } from "@/shared/types/unassigned-store-admin";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCameraReverse } from "react-icons/io5";
import { EditStoreInput, editStoreSchema } from "../_schemas/edit-store-schema";
import { useGetUnassignedStoreAdmin } from "../hooks/use-get-unassigned-store-admin";
import UserSelectDropdown from "./UserSelectDropdown";
import { editStoreDetails } from "@/actions/edit-store-details";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { deleteStore } from "@/actions/delete-store";
import { clearAssignedStore } from "@/actions/clear-assigned-store";

interface EditStoreFormProps {
  store: StoreType;
}

function EditStoreForm({ store }: EditStoreFormProps) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<Record<string, string>>({});
  const [hoverImage, setHoverImage] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isMapTouched, setIsMapTouched] = useState(false);
  const {
    lat: latitude,
    lng: longitude,
    setCords,
  } = useStoreAddressStore((state) => state);
  const assignedStoreAdmin = store?.user;

  const defaultValues = {
    address: store?.address,
    city: `${store?.cityId}%${store?.city}`,
    district: `${store?.districtId}%${store?.district}`,
    province: `${store?.provinceId}%${store?.province}`,
    latitude: store?.latitude,
    longitude: store?.longitude,
    name: store?.name,
    phone: store?.phone || "",
    postalCode: store?.postalCode,
    userId: store?.userId || "",
  };

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<EditStoreInput>({
    defaultValues,
    resolver: zodResolver(editStoreSchema),
  });

  // handle select file & catching upload preview
  const handleFileSelect = (file: File) => {
    if (file && file.size > MAX_AVATAR_IMAGE_SIZE) {
      setError((err) => ({
        ...err,
        avatar: "Image must be less than 1 MB",
      }));
      return;
    }

    if (file && !AVATAR_IMAGE_TYPES.includes(file.type)) {
      setError((err) => ({
        ...err,
        avatar: "Supported format only: jpg, jpeg, png and gif",
      }));
      return;
    }

    // remove all errors before assigning
    setError({});

    setAvatarPreview(URL.createObjectURL(file as File));
    setAvatarFile(file);
  };

  // get all province data
  const { data: provinces, isLoading: loadingProvince } = useGetProvinces();
  const watchedProvince = watch("province");

  // get all cities based on selected province
  const { data: city, isLoading: loadingCity } = useGetCity(
    String(watchedProvince),
  );
  const watchedCity = watch("city");

  // get all districts based on selected city
  const { data: district, isLoading: loadingDistrict } = useGetDistrict(
    String(watchedCity),
  );

  // get all unassigned store admin
  const { data: storeAdminData } = useGetUnassignedStoreAdmin();
  const storeAdmins: UnassignedStoreAdmin[] = storeAdminData?.data?.storeAdmin;
  console.log(storeAdmins);
  const handleChangeProvince = (value: string) => {
    setValue("province", value);
    setValue("city", "");
    setValue("district", "");
  };

  // handle submit
  const handleEditStore = handleSubmit((data) => {
    const { id: provinceId, name: province } = getIdAndNameLocation(
      String(data.province),
    );
    const { id: cityId, name: city } = getIdAndNameLocation(String(data.city));
    const { id: districtId, name: district } = getIdAndNameLocation(
      String(data.district),
    );

    const formData = new FormData();

    if (avatarFile) formData.append("avatar", avatarFile as File);
    if (store.name !== data.name) formData.append("name", String(data.name));
    if (store.address !== data.address)
      formData.append("address", String(data.address));
    if (store.cityId !== Number(cityId))
      formData.append("cityId", String(cityId));
    if (store.city !== city) formData.append("city", String(city));
    if (store.districtId !== Number(districtId))
      formData.append("districtId", String(districtId));
    if (store.district !== district)
      formData.append("district", String(district));
    if (store.provinceId !== Number(provinceId))
      formData.append("provinceId", String(provinceId));
    if (store.province !== province)
      formData.append("province", String(province));
    if (store.latitude !== latitude)
      formData.append("latitude", String(latitude));
    if (store.longitude !== longitude)
      formData.append("longitude", String(longitude));
    if (store?.user?.userId !== data.userId)
      formData.append("userId", String(data.userId));
    if (store.phone !== data.phone)
      formData.append("phone", String(data.phone));
    if (store.postalCode !== data.postalCode)
      formData.append("postalCode", String(data.postalCode));

    startTransition(async () => {
      const res = await editStoreDetails(formData, store.storeId);
      if (!res?.success) {
        toast.error(res.error);
      } else {
        toast.success("Store modified successfully");
        setError({});
        setCords({ lat: 43.21, lng: 0.123 });
        queryClient.invalidateQueries({ queryKey: ["store-details"] });
        router.push("/dashboard/store");
      }
    });
  });

  // detect if the user has touched the map
  useEffect(() => {
    if (latitude === store?.latitude && longitude === store?.longitude) {
      setIsMapTouched(true);
    } else {
      setIsMapTouched(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (store) {
      setCords({ lat: store.latitude, lng: store.longitude });
    }
  }, [store]);

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
        const res = await deleteStore(store.storeId);

        if (!res?.success) {
          toast.error(res?.error);
        } else {
          toast.success("Store deleted successfully");
          setError({});
          router.push("/dashboard/store");
        }
      }
    });
  };

  const handleClearAssignedStore = async () => {
    const res = await clearAssignedStore(store.storeId);

    if (!res?.success) {
      toast.error(res?.error);
    } else {
      toast.success("Admin clear successfully");
      setValue("userId", "");
      queryClient.invalidateQueries({
        queryKey: ["store-admin"],
      });
      queryClient.invalidateQueries({
        queryKey: ["store-details"],
      });
    }
  };

  return (
    <>
      <form onSubmit={handleEditStore}>
        <div className="flex flex-col justify-center items-center gap-5">
          {/* avatar */}
          <section
            onClick={() => imageInputRef.current?.click()}
            onMouseEnter={() => setHoverImage(true)}
            onMouseLeave={() => setHoverImage(false)}
            className="relative w-30 h-30 md:w-40 md:h-40 border-4 rounded-full border-brand-mist-200 ring-3 ring-brand-mist-200 overflow-hidden cursor-pointer">
            <Image
              src={avatarPreview || store?.avatar || defaultStoreAvatar}
              alt={`${store?.name}-avatar`}
              fill
              className={`object-cover ${hoverImage && "opacity-50 transition-all duration-300"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {hoverImage && (
              <div className="absolute z-100 left-10 top-10 md:left-15 md:top-15">
                <IoCameraReverse className="text-4xl text-brand-mist-500" />
              </div>
            )}
          </section>
          <div className="flex justify-center">
            {/* image input */}
            <input
              name="avatar"
              accept="image/jpeg,image/png,image/jpg,image/gif" // user will not be able to select other than these formats
              onChange={(e) => {
                const file = e.target.files?.[0];
                handleFileSelect(file as File);
              }}
              ref={imageInputRef}
              type="file"
              hidden
            />
            {error?.avatar ? (
              <p className="text-xs text-red-700 text-center">{error.avatar}</p>
            ) : (
              <p className="text-brand-mist-500 text-xs text-center">
                supported format: jpg, jpeg, png and gif - Max 1MB
              </p>
            )}
          </div>

          {/* form */}
          <section className="w-full flex gap-4">
            <div className="w-full">
              <div className="text-xs sm:text-sm pb-2 text-brand-mist-400">
                <label>
                  Store Name <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                {...register("name")}
                name="name"
                type="text"
                placeholder="Enter store name"
                className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
              />

              {errors.name && (
                <p className="pt-2 text-xs text-red-700">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="text-xs sm:text-sm pb-2 text-brand-mist-400">
                <label>
                  Phone <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                {...register("phone")}
                name="phone"
                type="text"
                placeholder="Enter shop phone"
                className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
              />

              {errors.phone && (
                <p className="pt-2 text-xs text-red-700">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </section>

          <section className="w-full">
            <div className="text-xs sm:text-sm pb-2 text-brand-mist-400">
              <label>
                Full Address <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="w-full">
              <input
                {...register("address")}
                name="address"
                type="text"
                placeholder="Enter store address"
                className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
              />

              {errors.address && (
                <p className="pt-2 text-xs text-red-700">
                  {errors.address.message}
                </p>
              )}
            </div>
          </section>

          {/* location */}
          <section className="w-full flex md:flex-row flex-col gap-4">
            <div className="w-full">
              <div className="text-xs sm:text-sm pb-2 text-brand-mist-400">
                <label>
                  Province <span className="text-red-500">*</span>
                </label>
              </div>
              <Controller
                name="province"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <select
                    id="province"
                    onChange={(e) => handleChangeProvince(e.target.value)}
                    onBlur={onBlur}
                    value={value as string}
                    className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400">
                    <option disabled={true}>Province</option>
                    {provinces?.data?.map((province: any, i: number) => (
                      <option key={i} value={`${province.id}%${province.name}`}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                )}
              />

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

              <Controller
                name="city"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <select
                    id={city}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value as string}
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
                )}
              />

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

              <Controller
                name="district"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <select
                    id="district"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value as string}
                    className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400">
                    {!district ? (
                      <option disabled={true}>Select city first</option>
                    ) : (
                      <option disabled={true}>District</option>
                    )}

                    {district?.data &&
                      district?.data?.map((district: any, i: number) => (
                        <option
                          key={i}
                          value={`${district.id}%${district.name}`}>
                          {district.name}
                        </option>
                      ))}
                  </select>
                )}
              />

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

          {/* Store Admin */}
          <section className="w-full">
            <div className="flex gap-2 text-xs sm:text-sm pb-2 text-brand-mist-400">
              <label>
                Assigned Store Admin <span className="text-red-500">*</span>
              </label>

              <Button btnType="text" onClick={handleClearAssignedStore}>
                Clear
              </Button>
            </div>
            <UserSelectDropdown
              control={control}
              usersData={storeAdmins}
              assignedStoreAdmin={assignedStoreAdmin}
            />
          </section>
        </div>

        <div>
          {!Object.keys(dirtyFields).length &&
          isMapTouched &&
          !avatarPreview ? (
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
              pendingLabel="Editing...">
              Save information
            </Button>
          )}
        </div>
      </form>

      <div>
        {store?.storeStatus === "PRIMARY" ? (
          <div className="cursor-help my-4 text-brand-mist-400 flex items-center justify-center text-sm">
            <p>You are unable to delete primary store </p>
          </div>
        ) : (
          <form action={handleDeleteAddress} className="mt-2">
            <Button
              type="submit"
              pendingLabel={<SpinnerMini />}
              btnType="danger">
              Delete address
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default EditStoreForm;
