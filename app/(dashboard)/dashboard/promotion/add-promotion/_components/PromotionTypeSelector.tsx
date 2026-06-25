"use client";

import { DiscountType } from "../../_hooks/use-discount";

interface PromotionTypeSelectorProps {
  value: DiscountType;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function PromotionTypeSelector({
  value,
  onChange,
}: PromotionTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-brand-mist-800">
        Promotion Type
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-brand-mist-300 rounded-xl px-3 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-brand-emerald-500 text-brand-mist-800"
      >
        <option value="NO_REQUIREMENT">No Requirement</option>
        <option value="MIN_TRANSACTION">Minimum Transaction</option>
        <option value="BUY_ONE_GET_ONE">Buy One Get One Free (BOGO)</option>
      </select>
    </div>
  );
}
