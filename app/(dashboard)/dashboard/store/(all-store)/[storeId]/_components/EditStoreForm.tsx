"use client";

import { StoreType } from "@/shared/types/store-types";
import { useForm } from "react-hook-form";
import { EditStoreInput, editStoreSchema } from "../_schemas/edit-store-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import {
  AVATAR_IMAGE_TYPES,
  MAX_AVATAR_IMAGE_SIZE,
} from "@/shared/statics/file-upload-config-static";
import Image from "next/image";
import { IoCameraReverse } from "react-icons/io5";
import defaultStoreAvatar from "@/public/store/default-store-avatar-1.jpeg";

interface EditStoreFormProps {
  store: StoreType;
}

function EditStoreForm({ store }: EditStoreFormProps) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<Record<string, string>>({});
  const [hoverImage, setHoverImage] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const defaultValues = {
    address: store?.address,
    city: `${store?.city}%${store?.cityId}`,
    district: `${store?.district}%${store?.district}`,
    province: `${store?.province}%${store?.province}`,
    latitude: store?.latitude,
    longitude: store?.longitude,
    name: store?.name,
    phone: store?.phone || "",
    postalCode: store?.postalCode,
    userId: store?.userId || "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, dirtyFields },
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

  return (
    <form>
      <div className="flex flex-col justify-center items-center gap-5">
        {/* avatar */}
        <section
          onClick={() => imageInputRef.current?.click()}
          onMouseEnter={() => setHoverImage(true)}
          onMouseLeave={() => setHoverImage(false)}
          className="relative w-30 h-30 md:w-40 md:h-40 border-2 rounded-full border-brand-mist-200 ring-3 ring-brand-emerald-700 overflow-hidden cursor-pointer">
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
              <p className="pt-2 text-xs text-red-700">{errors.name.message}</p>
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
      </div>
    </form>
  );
}

export default EditStoreForm;
