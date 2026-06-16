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
import {
  AVATAR_IMAGE_TYPES,
  MAX_AVATAR_IMAGE_SIZE,
} from "@/shared/statics/file-upload-config-static";
import { editCustomerProfile } from "@/actions/edit-customer-profile";
import { Gender, Role, User } from "@/shared/types/user-type";
import { ApiResponse } from "@/shared/types/api-type";
import { AuthStates } from "@/shared/store/auth-store/auth-store";
import { toast } from "sonner";
import VerificationAlert from "../../_components/VerificationAlert";
import { useRouter } from "next/navigation";
import { capitalize } from "@/shared/utils/capitalize";

function ProfileForm() {
  const {
    avatar,
    email,
    firstName,
    lastName,
    phone,
    gender,
    setAuth,
    isVerified,
  } = useAuthStore((state) => state);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<Record<string, string>>({});
  const [hoverImage, setHoverImage] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<EditCustomerProfileInput>({
    resolver: zodResolver(editCustomerProfileSchema),
    defaultValues: {
      email,
      firstName,
      lastName,
      phone: String(phone) || null,
      gender,
    },
  });

  const handleEditProfile = handleSubmit(async (data) => {
    const formData = new FormData();

    if (avatar) formData.append("avatar", avatarFile as File);
    if (data?.firstName !== firstName)
      formData.append("firstName", String(data.firstName));
    if (data?.lastName !== lastName)
      formData.append("lastName", String(data.lastName));
    if (data?.email !== email) formData.append("email", String(data.email));
    if (data?.gender !== gender)
      formData.append("gender", data.gender as Gender);
    if (data?.phone !== (phone || ""))
      formData.append("phone", String(data.phone));

    const res = await editCustomerProfile(formData);

    if (!res.success) {
      toast.error(res.error);
    } else {
      const updatedUserData: User = res.data;

      const initialAuth: AuthStates = {
        userId: String(updatedUserData?.userId),
        firstName: capitalize(String(updatedUserData?.firstName)),
        lastName: capitalize(String(updatedUserData?.lastName)),
        email: String(updatedUserData?.email),
        avatar: String(updatedUserData?.avatar),
        phone: String(updatedUserData?.phone),
        role: updatedUserData?.role as Role,
        isVerified: updatedUserData?.isVerified,
        gender: updatedUserData?.gender as Gender,
      };

      setAuth(initialAuth); // update navbar ui
      setAvatarFile(null); // set avatar to true, to make sure the field is dirty

      toast.success(
        `Your profile updated successfully! ${data?.email !== email ? "Check your email to verify account" : ""}`,
      );

      router.refresh();
    }
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
    <>
      {/* verification alert */}
      <section>{!isVerified && <VerificationAlert email={email} />}</section>

      {/* edit form */}
      <form onSubmit={handleEditProfile} className="mt-10">
        <div className="flex flex-col md:flex-row gap-8 mb-4">
          <section className="w-full flex flex-col gap-10 items-center justify-center md:w-[40%]">
            <div
              onClick={() => imageInputRef.current?.click()}
              onMouseEnter={() => setHoverImage(true)}
              onMouseLeave={() => setHoverImage(false)}
              className="relative w-30 h-30 md:w-40 md:h-40 border-2 rounded-full border-brand-mist-200 ring-3 ring-brand-emerald-700 overflow-hidden cursor-pointer">
              <Image
                src={avatarPreview || avatar || defaultUserProfile}
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
                <p className="text-xs text-red-700 text-center">
                  {error.avatar}
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

        {!Object.keys(dirtyFields).length && !avatarFile ? (
          <Button
            btnType="primary"
            pendingLabel="Start editing" // this will shows up in the UI as disabled is always true
            disabled={true}
            type="button">
            Start editing
          </Button>
        ) : (
          <Button
            btnType="primary"
            disabled={isSubmitting}
            pendingLabel="Submitting..."
            type="submit">
            Save your profile information
          </Button>
        )}
      </form>
    </>
  );
}

export default ProfileForm;
