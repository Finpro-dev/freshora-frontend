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
        className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-xs rounded-xl px-3 py-2.5 appearance-none pr-8"
      >
        <option value="NO_REQUIREMENT">No Requirement</option>
        <option value="MIN_TRANSACTION">Minimum Transaction</option>
        <option value="BUY_ONE_GET_ONE">Buy One Get One Free (BOGO)</option>
      </select>
    </div>
  );
}
