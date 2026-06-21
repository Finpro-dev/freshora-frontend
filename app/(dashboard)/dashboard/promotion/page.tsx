"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Tag,
  Percent,
  Calendar,
  ToggleLeft,
  ToggleRight,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  ChevronDown,
} from "lucide-react";

const PROMOTIONS = [
  {
    id: 1,
    code: "WELCOME10",
    type: "Percentage",
    value: 10,
    minPurchase: 100000,
    used: 234,
    limit: 500,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "Active",
  },
  {
    id: 2,
    code: "FREESHIP",
    type: "Free Shipping",
    value: 0,
    minPurchase: 50000,
    used: 567,
    limit: 1000,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "Active",
  },
  {
    id: 3,
    code: "SAVE20K",
    type: "Fixed Amount",
    value: 20000,
    minPurchase: 150000,
    used: 123,
    limit: 300,
    startDate: "2024-01-10",
    endDate: "2024-01-20",
    status: "Expired",
  },
  {
    id: 4,
    code: "NEWYEAR25",
    type: "Percentage",
    value: 25,
    minPurchase: 200000,
    used: 890,
    limit: 1000,
    startDate: "2024-01-01",
    endDate: "2024-01-05",
    status: "Expired",
  },
  {
    id: 5,
    code: "VIP15",
    type: "Percentage",
    value: 15,
    minPurchase: 250000,
    used: 45,
    limit: 200,
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    status: "Scheduled",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-brand-emerald-100 text-brand-emerald-700";
    case "Expired":
      return "bg-red-100 text-red-700";
    case "Scheduled":
      return "bg-blue-100 text-blue-700";
    case "Paused":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-brand-mist-200 text-brand-mist-700";
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case "Percentage":
      return <Percent className="w-4 h-4" />;
    case "Free Shipping":
      return <Tag className="w-4 h-4" />;
    case "Fixed Amount":
      return <Percent className="w-4 h-4" />;
    default:
      return <Tag className="w-4 h-4" />;
  }
}

export default function PromotionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPromotions = PROMOTIONS.filter((promo) => {
    const matchesSearch = promo.code
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || promo.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">Promotions</h1>
          <p className="text-brand-mist-500">
            Manage discount codes and promotional campaigns
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Create Promotion
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Active Promos</span>
            <Tag className="w-5 h-5 text-brand-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-brand-mist-800">2</p>
          <p className="text-xs text-brand-emerald-600 mt-1">
            +1 from last month
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Total Usage</span>
            <Percent className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-brand-mist-800">1,859</p>
          <p className="text-xs text-brand-emerald-600 mt-1">
            +12.5% usage rate
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Avg. Discount</span>
            <Percent className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-brand-mist-800">15.2%</p>
          <p className="text-xs text-brand-mist-500 mt-1">Across all promos</p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Expiring Soon</span>
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-brand-mist-800">1</p>
          <p className="text-xs text-red-600 mt-1">Within 7 days</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-mist-500" />
            <input
              type="text"
              placeholder="Search by promo code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="scheduled">Scheduled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Promotions Table - Desktop */}
      <div className="hidden md:block bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-mist-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider hidden lg:table-cell">
                Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider hidden xl:table-cell">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-mist-200">
            {filteredPromotions.map((promo) => (
              <tr
                key={promo.id}
                className="hover:bg-brand-mist-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-brand-emerald-100 text-brand-emerald-700">
                      {getTypeIcon(promo.type)}
                    </div>
                    <span className="font-mono font-semibold text-brand-mist-800">
                      {promo.code}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-mist-600">
                  {promo.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-mist-800">
                  {promo.type === "Percentage"
                    ? `${promo.value}%`
                    : promo.type === "Fixed Amount"
                      ? `Rp ${promo.value.toLocaleString()}`
                      : "Free"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-brand-mist-200 rounded-full h-2 w-24">
                      <div
                        className="bg-brand-emerald-500 h-2 rounded-full"
                        style={{
                          width: `${(promo.used / promo.limit) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-brand-mist-600">
                      {promo.used}/{promo.limit}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-mist-500 hidden xl:table-cell">
                  {promo.startDate} - {promo.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(promo.status)}`}
                  >
                    {promo.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-1.5 rounded-lg hover:bg-brand-emerald-100 text-brand-emerald-600 transition-colors"
                      title="Copy Code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Promotions Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredPromotions.map((promo) => (
          <div
            key={promo.id}
            className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-emerald-100 text-brand-emerald-700">
                  {getTypeIcon(promo.type)}
                </div>
                <div>
                  <p className="font-mono font-semibold text-brand-mist-800">
                    {promo.code}
                  </p>
                  <p className="text-xs text-brand-mist-500">{promo.type}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(promo.status)}`}
              >
                {promo.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-brand-mist-600">
                Value:{" "}
                <span className="font-medium text-brand-mist-800">
                  {promo.type === "Percentage"
                    ? `${promo.value}%`
                    : promo.type === "Fixed Amount"
                      ? `Rp ${promo.value.toLocaleString()}`
                      : "Free Shipping"}
                </span>
              </span>
              <span className="text-brand-mist-500">
                Min: Rp {promo.minPurchase.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-brand-mist-500 mb-3">
              <span>
                Used: {promo.used}/{promo.limit}
              </span>
              <span>
                {promo.startDate} - {promo.endDate}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-brand-mist-200">
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-brand-emerald-50 text-brand-emerald-600 text-xs font-medium hover:bg-brand-emerald-100 transition-colors">
                <Copy className="w-3 h-3" />
                Copy
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors">
                <Edit className="w-3 h-3" />
                Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors">
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPromotions.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-brand-mist-200 shadow-sm">
          <p className="text-brand-mist-500">
            No promotions found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
