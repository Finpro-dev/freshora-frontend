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
  isEdit?: boolean;
}

export default function AdminFormFields({
  formData,
  onChange,
  isEdit = false,
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
            placeholder="e.g. Novpa"
            value={formData.firstName}
            onChange={onChange}
            required
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="e.g. Rodriguez"
            value={formData.lastName}
            onChange={onChange}
            required
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
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
          placeholder="e.g. admin@example.com"
          value={formData.email}
          onChange={onChange}
          required
          readOnly={isEdit}
          className={`input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm ${
            isEdit
              ? "bg-brand-mist-50 text-brand-mist-500 cursor-not-allowed"
              : ""
          }`}
        />
        {isEdit && (
          <p className="text-xs text-brand-mist-400 mt-1">
            Email cannot be changed.
          </p>
        )}
        {!isEdit && (
          <p className="text-xs text-brand-mist-400 mt-1">
            An invitation or verification link will be sent to this email.
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
          Phone Number{" "}
          <span className="text-brand-mist-400 font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          name="phone"
          placeholder="e.g. 08123456789"
          value={formData.phone}
          onChange={onChange}
          className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
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
          className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm rounded-xl px-3 py-2 appearance-none pr-8"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>
    </>
  );
}
