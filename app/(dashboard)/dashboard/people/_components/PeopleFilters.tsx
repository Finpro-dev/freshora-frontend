"use client";

import { Search, ChevronDown } from "lucide-react";

interface PeopleFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleChange: (value: string) => void;
}

export default function PeopleFilters({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleChange,
}: PeopleFiltersProps) {
  return (
    <div className="bg-brand-mist-100/10 rounded-xl p-4 border border-brand-mist-200 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-mist-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input w-full pl-10 pr-4 py-2.5 border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
          />
        </div>
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => onRoleChange(e.target.value)}
            className="select w-full sm:w-auto border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm rounded-xl px-4 py-2.5 appearance-none pr-10"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="store_admin">Store Admin</option>
            <option value="customer">Customer</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
