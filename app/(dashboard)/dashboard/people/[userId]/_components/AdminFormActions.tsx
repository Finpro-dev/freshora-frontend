"use client";

import { Loader2, Save, X } from "lucide-react";

interface AdminFormActionsProps {
  onCancel: () => void;
  isPending: boolean;
}

export default function AdminFormActions({
  onCancel,
  isPending,
}: AdminFormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-mist-200">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-brand-mist-300 rounded-lg text-sm font-medium text-brand-mist-700 hover:bg-brand-mist-50 transition-colors"
        disabled={isPending}
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" /> Save Changes
          </>
        )}
      </button>
    </div>
  );
}
