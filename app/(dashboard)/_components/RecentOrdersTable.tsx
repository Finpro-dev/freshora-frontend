"use client";

import { useState } from "react";
import { Search, Eye, Edit, Trash2 } from "lucide-react";

const RECENT_ORDERS = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    product: "Organic Vegetables",
    amount: "Rp 125.000",
    status: "Completed",
    date: "2024-01-15",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    product: "Fresh Fruits Pack",
    amount: "Rp 89.500",
    status: "Pending",
    date: "2024-01-15",
  },
  {
    id: "#ORD-003",
    customer: "Bob Johnson",
    product: "Dairy Products",
    amount: "Rp 234.000",
    status: "Processing",
    date: "2024-01-14",
  },
  {
    id: "#ORD-004",
    customer: "Alice Brown",
    product: "Bakery Items",
    amount: "Rp 156.000",
    status: "Completed",
    date: "2024-01-14",
  },
  {
    id: "#ORD-005",
    customer: "Charlie Wilson",
    product: "Meat & Seafood",
    amount: "Rp 312.000",
    status: "Cancelled",
    date: "2024-01-13",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-brand-emerald-100 text-brand-emerald-700";
    case "Pending":
      return "bg-amber-100 text-amber-700";
    case "Processing":
      return "bg-blue-100 text-blue-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-brand-mist-200 text-brand-mist-700";
  }
}

export default function RecentOrdersTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = RECENT_ORDERS.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
      <div className="p-4 md:p-6 border-b border-brand-mist-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-brand-mist-800">
              Recent Orders
            </h3>
            <p className="text-sm text-brand-mist-500">
              Latest customer orders
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-brand-mist-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent w-full sm:w-auto"
              />
            </div>
            <button className="p-2 rounded-lg border border-brand-mist-300 hover:bg-brand-mist-200 transition-colors sm:hidden">
              <Search className="w-4 h-4 text-brand-mist-700" />
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-brand-mist-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider hidden sm:table-cell">
                Product
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider hidden md:table-cell">
                Date
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-mist-200">
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-brand-mist-50 transition-colors"
              >
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-brand-mist-800">
                    {order.id}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-emerald-100 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-brand-emerald-700">
                        {order.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="text-brand-mist-800">
                      {order.customer}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-brand-mist-600 hidden sm:table-cell">
                  {order.product}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap font-medium text-brand-mist-800">
                  {order.amount}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-brand-mist-500 hidden md:table-cell">
                  {order.date}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-brand-emerald-100 text-brand-emerald-600 transition-colors">
                      <Eye className="w-4 h-4" />
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
      {/* Pagination */}
      <div className="px-4 md:px-6 py-4 border-t border-brand-mist-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-brand-mist-500">
          Showing <span className="font-medium text-brand-mist-700">1</span> to{" "}
          <span className="font-medium text-brand-mist-700">5</span> of{" "}
          <span className="font-medium text-brand-mist-700">245</span> results
        </p>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-lg border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200 transition-colors text-sm disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-brand-emerald-700 text-white text-sm">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200 transition-colors text-sm">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200 transition-colors text-sm">
            3
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200 transition-colors text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
