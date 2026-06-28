"use client";

import { DiscountValueType, DiscountType } from "../../_hooks/use-discount";

interface FormData {
  type: DiscountType;
  valueType: DiscountValueType;
  discountAmount: string;
  minTransaction: string;
  maxDiscount: string;
}

interface DiscountValueFieldsProps {
  formData: FormData;
  onChange: (partial: Partial<FormData>) => void;
}

export default function DiscountValueFields({
  formData,
  onChange,
}: DiscountValueFieldsProps) {
  return (
    <>
      {formData.type !== "MIN_TRANSACTION" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-mist-800">
              Value Type
            </label>
            <select
              value={formData.valueType}
              onChange={(e) =>
                onChange({ valueType: e.target.value as DiscountValueType })
              }
              className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-xs rounded-xl px-3 py-2.5 appearance-none pr-8"
            >
              <option value="PERCENTAGE">Percentage (%)</option>
              <option value="NOMINAL">Nominal (Rp)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-mist-800">
              Amount
            </label>
            <input
              type="number"
              required
              placeholder={
                formData.valueType === "PERCENTAGE" ? "e.g., 25" : "e.g., 15000"
              }
              value={formData.discountAmount}
              onChange={(e) => onChange({ discountAmount: e.target.value })}
              className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
            />
          </div>
        </div>
      )}

      {formData.type === "MIN_TRANSACTION" && (
        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-mist-800">
            Minimum Purchase Value
          </label>
          <input
            type="number"
            required
            placeholder="e.g., 75000"
            value={formData.minTransaction}
            onChange={(e) => onChange({ minTransaction: e.target.value })}
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
          />
        </div>
      )}

      {formData.valueType === "PERCENTAGE" &&
        formData.type !== "BUY_ONE_GET_ONE" && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-mist-800">
              Max Discount (Optional)
            </label>
            <input
              type="number"
              placeholder="Leave blank for no limit"
              value={formData.maxDiscount}
              onChange={(e) => onChange({ maxDiscount: e.target.value })}
              className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
            />
          </div>
        )}
    </>
  );
}
