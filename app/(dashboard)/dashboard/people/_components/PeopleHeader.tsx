"use client";

import { Plus } from "lucide-react";

interface PeopleHeaderProps {
  onAdd: () => void;
}

export default function PeopleHeader({ onAdd }: PeopleHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-mist-800">People</h1>
        <p className="text-brand-mist-500">
          Manage users, store admins, and permissions
        </p>
      </div>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium"
        onClick={onAdd}
      >
        <Plus className="w-4 h-4" />
        Add Store Admin
      </button>
    </div>
  );
}
