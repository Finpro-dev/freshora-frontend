"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupInput, signupSchema } from "../../_schemas/signup-schema";
import { signupCustomer } from "@/actions/signup-user";
import { redirect } from "next/navigation";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await signupCustomer(data);
    if (res) redirect("/", "replace");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* first name & last name */}
      <section className="w-full flex md:flex-row flex-col gap-4">
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
      </section>

      {/* email & phone */}
      <section className="w-full flex md:flex-row flex-col gap-4">
        <div className="w-full">
          <input
            {...register("email")}
            name="email"
            type="text"
            placeholder="Enter email"
            className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
          />

          {errors.email && (
            <p className="pt-2 text-xs text-red-700">{errors.email.message}</p>
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
            <p className="pt-2 text-xs text-red-700">{errors.phone.message}</p>
          )}
        </div>
      </section>

      {/* gender and referral code */}
      <section className="w-full flex md:flex-row flex-col gap-4">
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
            <p className="pt-2 text-xs text-red-700">{errors.gender.message}</p>
          )}
        </div>
        <div className="w-full">
          <input
            {...register("usedReferralCode")}
            name="usedReferralCode"
            type="text"
            placeholder="Referral code (Optional)"
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400"
          />

          {errors.phone && (
            <p className="pt-2 text-xs text-red-700">{errors.phone.message}</p>
          )}
        </div>
      </section>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full h-10 flex items-center justify-center bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 disabled:bg-brand-mist-500 cursor-pointer">
        Continue
      </button>
    </form>
  );
}

export default SignupForm;
