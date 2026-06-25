"use client";

import { Loader2, PlusCircle, X } from "lucide-react";

interface FormActionsProps {
  onCancel: () => void;
  isPending: boolean;
  submitLabel?: string;
}

export default function FormActions({
  onCancel,
  isPending,
  submitLabel = "Save Changes",
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-6 border-t border-brand-mist-100">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2.5 rounded-xl text-sm font-bold text-brand-mist-500 hover:bg-brand-mist-50 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isPending}
        className="px-8 py-2.5 bg-brand-emerald-700 text-white rounded-xl text-sm font-bold hover:bg-brand-emerald-800 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg transition"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <PlusCircle className="w-4 h-4" /> {submitLabel}
          </>
        )}
      </button>
    </div>
  );
}
