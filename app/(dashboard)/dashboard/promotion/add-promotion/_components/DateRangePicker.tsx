"use client";

import { Calendar } from "lucide-react";

interface FormData {
  validFrom: string;
  validUntil: string;
}

interface DateRangePickerProps {
  formData: FormData;
  onChange: (partial: Partial<FormData>) => void;
}

export default function DateRangePicker({
  formData,
  onChange,
}: DateRangePickerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-bold text-brand-mist-800">
          Valid From
        </label>
        <div className="relative">
          <Calendar className="w-4 h-4 text-brand-mist-400 absolute left-3 top-3.5 pointer-events-none" />
          <input
            type="datetime-local"
            required
            value={formData.validFrom}
            onChange={(e) => onChange({ validFrom: e.target.value })}
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-brand-mist-800">
          Valid Until
        </label>
        <div className="relative">
          <Calendar className="w-4 h-4 text-brand-mist-400 absolute left-3 top-3.5 pointer-events-none" />
          <input
            type="datetime-local"
            required
            value={formData.validUntil}
            onChange={(e) => onChange({ validUntil: e.target.value })}
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm pl-10"
          />
        </div>
      </div>
    </div>
  );
}
