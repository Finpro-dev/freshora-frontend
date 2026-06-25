"use client";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE";
}

interface AdminFormFieldsProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export default function AdminFormFields({
  formData,
  onChange,
}: AdminFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm bg-brand-mist-50 text-brand-mist-500 cursor-not-allowed"
          disabled
        />
        <p className="text-xs text-brand-mist-400 mt-1">
          Email cannot be changed.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          placeholder="e.g. 08123456789"
          value={formData.phone}
          onChange={onChange}
          className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={onChange}
          className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm bg-white"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>

      {/* Metadata Readonly */}
      <div className="pt-4 border-t border-brand-mist-100 grid grid-cols-2 gap-4 text-xs text-brand-mist-500">
        <div>
          <span className="block font-medium">Referral Code:</span>
          <span className="font-mono text-brand-mist-700">—</span>
        </div>
        <div>
          <span className="block font-medium">Verification Status:</span>
          <span className="text-emerald-600 font-semibold">—</span>
        </div>
      </div>
    </>
  );
}
