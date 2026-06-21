"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  ChevronDown,
} from "lucide-react";

const INVENTORY = [
  {
    id: "INV-001",
    name: "Organic Tomatoes",
    category: "Vegetables",
    stock: 156,
    minStock: 50,
    unit: "KG",
    price: 25000,
    status: "In Stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: "INV-002",
    name: "Fresh Milk",
    category: "Dairy",
    stock: 23,
    minStock: 30,
    unit: "L",
    price: 18000,
    status: "Low Stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: "INV-003",
    name: "Whole Wheat Bread",
    category: "Bakery",
    stock: 0,
    minStock: 20,
    unit: "PCS",
    price: 15000,
    status: "Out of Stock",
    lastUpdated: "2024-01-14",
  },
  {
    id: "INV-004",
    name: "Chicken Breast",
    category: "Meat",
    stock: 89,
    minStock: 40,
    unit: "KG",
    price: 85000,
    status: "In Stock",
    lastUpdated: "2024-01-14",
  },
  {
    id: "INV-005",
    name: "Red Apples",
    category: "Fruits",
    stock: 12,
    minStock: 25,
    unit: "KG",
    price: 35000,
    status: "Low Stock",
    lastUpdated: "2024-01-13",
  },
  {
    id: "INV-006",
    name: "Basmati Rice",
    category: "Grains",
    stock: 340,
    minStock: 100,
    unit: "KG",
    price: 65000,
    status: "In Stock",
    lastUpdated: "2024-01-13",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "In Stock":
      return "bg-brand-emerald-100 text-brand-emerald-700";
    case "Low Stock":
      return "bg-amber-100 text-amber-700";
    case "Out of Stock":
      return "bg-red-100 text-red-700";
    default:
      return "bg-brand-mist-200 text-brand-mist-700";
  }
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredInventory = INVENTORY.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      item.status.toLowerCase().replace(" ", "_") === statusFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      item.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(
    new Set(INVENTORY.map((item) => item.category)),
  );
  const totalItems = INVENTORY.length;
  const lowStockCount = INVENTORY.filter(
    (item) => item.status === "Low Stock",
  ).length;
  const outOfStockCount = INVENTORY.filter(
    (item) => item.status === "Out of Stock",
  ).length;
  const totalValue = INVENTORY.reduce(
    (sum, item) => sum + item.stock * item.price,
    0,
  );

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">Inventory</h1>
          <p className="text-brand-mist-500">
            Track and manage product stock levels
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium">
          <Package className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Total Products</span>
            <Package className="w-5 h-5 text-brand-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-brand-mist-800">{totalItems}</p>
          <p className="text-xs text-brand-mist-500 mt-1">Active inventory</p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Low Stock</span>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">{lowStockCount}</p>
          <p className="text-xs text-amber-600 mt-1">Needs restock</p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Out of Stock</span>
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
          <p className="text-xs text-red-600 mt-1">Urgent restock</p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Total Value</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-brand-mist-800">
            Rp {(totalValue / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-brand-mist-500 mt-1">Inventory worth</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-mist-500" />
            <input
              type="text"
              placeholder="Search by product name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-auto appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-mist-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider hidden xl:table-cell">
                Last Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-mist-200">
            {filteredInventory.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-brand-mist-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-emerald-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-brand-emerald-700" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-mist-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-brand-mist-500">{item.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-mist-600">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${item.stock <= item.minStock ? "text-red-600" : "text-brand-mist-800"}`}
                    >
                      {item.stock} {item.unit}
                    </span>
                    {item.stock <= item.minStock && item.stock > 0 && (
                      <span className="text-xs text-amber-600">(Low)</span>
                    )}
                    {item.stock === 0 && (
                      <span className="text-xs text-red-600">(Out)</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-mist-800">
                  Rp {item.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-mist-500 hidden xl:table-cell">
                  {item.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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

      {/* Inventory Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredInventory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-emerald-100 flex items-center justify-center">
                  <Package className="w-5 h-5 text-brand-emerald-700" />
                </div>
                <div>
                  <p className="font-medium text-brand-mist-800">{item.name}</p>
                  <p className="text-xs text-brand-mist-500">{item.id}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
              >
                {item.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-brand-mist-600">{item.category}</span>
              <span className="font-medium text-brand-mist-800">
                Rp {item.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-brand-mist-500 mb-3">
              <span>
                Stock:{" "}
                <span
                  className={
                    item.stock <= item.minStock
                      ? "text-red-600 font-medium"
                      : ""
                  }
                >
                  {item.stock} {item.unit}
                </span>
              </span>
              <span>Updated: {item.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-brand-mist-200">
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-brand-emerald-50 text-brand-emerald-600 text-xs font-medium hover:bg-brand-emerald-100 transition-colors">
                <Eye className="w-3 h-3" />
                View
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

      {filteredInventory.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-brand-mist-200 shadow-sm">
          <p className="text-brand-mist-500">
            No inventory items found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="px-4 md:px-6 py-4 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-brand-mist-500">
          Showing <span className="font-medium text-brand-mist-700">1</span> to{" "}
          <span className="font-medium text-brand-mist-700">
            {filteredInventory.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-brand-mist-700">
            {INVENTORY.length}
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
  );
}
