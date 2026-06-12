"use client";

import Button from "@/shared/components/Button";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { useForm } from "react-hook-form";
import {
  EditCustomerProfileInput,
  editCustomerProfileSchema,
} from "../_schemas/edit-customer-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import defaultUserProfile from "@/public/user/default-user-profile.png";
import { useRef, useState } from "react";
import { IoCameraReverse } from "react-icons/io5";

function ProfileForm() {
  const { avatar, email, firstName, lastName, phone } = useAuthStore(
    (state) => state,
  );
  const [hoverImage, setHoverImage] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<EditCustomerProfileInput>({
    resolver: zodResolver(editCustomerProfileSchema),
    defaultValues: {
      email,
      firstName,
      lastName,
      phone: String(phone) || null,
    },
  });

  const handleEditProfile = () => {
    handleSubmit((data) => {
      console.log(data);
    });
  };

  const handleFileSelect = (file: File) => {
    // setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="mt-10">
      <div className="flex flex-col md:flex-row gap-8 mb-4">
        <section className="w-full flex flex-col gap-10 items-center justify-center md:w-[40%]">
          <div
            onClick={() => imageInputRef.current?.click()}
            onMouseEnter={() => setHoverImage(true)}
            onMouseLeave={() => setHoverImage(false)}
            className="relative w-30 h-30 md:w-40 md:h-40 border-2 rounded-full border-brand-mist-200 ring-3 ring-brand-emerald-700 overflow-hidden cursor-pointer">
            <Image
              src={avatar || defaultUserProfile}
              alt={`${firstName}-profile-picture`}
              fill
              className={`object-cover ${hoverImage && "opacity-50 transition-all duration-300"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {hoverImage && (
              <div className="absolute z-100 left-10 top-10 md:left-15 md:top-15">
                <IoCameraReverse className="text-4xl text-brand-mist-500" />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            {/* image input */}
            <input
              {...register("avatar")}
              name="avatar"
              ref={imageInputRef}
              type="file"
              hidden
            />
            {errors.avatar ? (
              <p className="text-xs text-red-700 text-center">
                {errors.avatar.message}
              </p>
            ) : (
              <p className="text-brand-mist-500 text-xs text-center">
                supported format: jpg, jpeg, png and gif - Max 1MB
              </p>
            )}
          </div>
        </section>
        <section className="w-full md:w-[60%] flex flex-col gap-4">
          <div className="w-full">
            <input
              {...register("firstName")}
              name="firstName"
              type="text"
              placeholder="Enter first name"
              className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
            />

            {errors.firstName && (
              <p className="pt-2 text-xs text-red-700">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              {...register("lastName")}
              name="lastName"
              type="text"
              placeholder="Enter last name"
              className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
            />

            {errors.lastName && (
              <p className="pt-2 text-xs text-red-700">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* email & phone */}
          <div className="w-full">
            <input
              {...register("email")}
              name="email"
              type="text"
              placeholder="Enter email"
              className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
            />

            {errors.email && (
              <p className="pt-2 text-xs text-red-700">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              {...register("phone")}
              name="phone"
              type="text"
              placeholder="Enter valid phone number"
              className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
            />

            {errors.phone && (
              <p className="pt-2 text-xs text-red-700">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* gender and referral code */}
          <div className="w-full">
            <select
              {...register("gender")}
              name="gender"
              defaultValue="Pick a color"
              className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400">
              <option disabled={true}>Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>

            {errors.gender && (
              <p className="pt-2 text-xs text-red-700">
                {errors.gender.message}
              </p>
            )}
          </div>
        </section>
      </div>

      <Button
        btnType="primary"
        disabled={isSubmitting}
        pendingLabel="Submitting..."
        type="submit">
        Save your profile information
      </Button>
    </form>
  );
}

export default ProfileForm;
