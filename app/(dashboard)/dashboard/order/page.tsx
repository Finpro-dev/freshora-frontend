"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
} from "lucide-react";

const ORDERS = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    amount: "Rp 125.000",
    status: "Completed",
    date: "2024-01-15",
    items: 3,
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    amount: "Rp 89.500",
    status: "Pending",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "#ORD-003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    amount: "Rp 234.000",
    status: "Processing",
    date: "2024-01-14",
    items: 5,
  },
  {
    id: "#ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    amount: "Rp 156.000",
    status: "Completed",
    date: "2024-01-14",
    items: 4,
  },
  {
    id: "#ORD-005",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    amount: "Rp 312.000",
    status: "Cancelled",
    date: "2024-01-13",
    items: 2,
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

export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = ORDERS.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">Orders</h1>
          <p className="text-brand-mist-500">Manage and track all orders</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add Order
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-mist-500" />
            <input
              type="text"
              placeholder="Search orders by ID, customer, or email..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-brand-mist-300 bg-white hover:bg-brand-mist-200 transition-colors text-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-mist-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider hidden sm:table-cell">
                  Customer
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider hidden sm:table-cell">
                  Items
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider hidden md:table-cell">
                  Date
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
                    <span className="font-medium text-brand-emerald-600">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div>
                      <p className="font-medium text-brand-mist-800">
                        {order.customer}
                      </p>
                      <p className="text-xs text-brand-mist-500">
                        {order.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-brand-mist-600 hidden md:table-cell">
                    {order.email}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-brand-mist-600 hidden sm:table-cell">
                    {order.items} items
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap font-medium text-brand-mist-800">
                    {order.amount}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-brand-mist-500 hidden md:table-cell">
                    {order.date}
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
        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-brand-mist-500">
            <p>No orders found matching your criteria.</p>
          </div>
        )}
        {/* Pagination */}
        <div className="px-4 md:px-6 py-4 border-t border-brand-mist-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-brand-mist-500">
            Showing <span className="font-medium text-brand-mist-700">1</span>{" "}
            to{" "}
            <span className="font-medium text-brand-mist-700">
              {filteredOrders.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-brand-mist-700">
              {ORDERS.length}
            </span>{" "}
            results
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
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
