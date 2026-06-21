"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Package,
  Tag,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  Image as ImageIcon,
  Star,
} from "lucide-react";

const PRODUCTS = [
  {
    id: "PRD-001",
    name: "Organic Tomatoes",
    category: "Vegetables",
    price: 25000,
    stock: 156,
    sold: 234,
    status: "Active",
    grade: "A",
    image: null,
  },
  {
    id: "PRD-002",
    name: "Fresh Apples",
    category: "Fruits",
    price: 35000,
    stock: 89,
    sold: 189,
    status: "Active",
    grade: "A",
    image: null,
  },
  {
    id: "PRD-003",
    name: "Whole Milk",
    category: "Dairy",
    price: 18000,
    stock: 23,
    sold: 156,
    status: "Active",
    grade: "B",
    image: null,
  },
  {
    id: "PRD-004",
    name: "Sourdough Bread",
    category: "Bakery",
    price: 15000,
    stock: 0,
    sold: 98,
    status: "Out of Stock",
    grade: "A",
    image: null,
  },
  {
    id: "PRD-005",
    name: "Chicken Breast",
    category: "Meat",
    price: 85000,
    stock: 67,
    sold: 145,
    status: "Active",
    grade: "A",
    image: null,
  },
];

function getGradeColor(grade: string) {
  switch (grade) {
    case "A":
      return "bg-brand-emerald-100 text-brand-emerald-700";
    case "B":
      return "bg-blue-100 text-blue-700";
    case "C":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-brand-mist-200 text-brand-mist-700";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-brand-emerald-100 text-brand-emerald-700";
    case "Out of Stock":
      return "bg-red-100 text-red-700";
    case "Draft":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-brand-mist-200 text-brand-mist-700";
  }
}

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      product.status.toLowerCase().replace(" ", "_") === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)));
  const totalProducts = PRODUCTS.length;
  const activeProducts = PRODUCTS.filter((p) => p.status === "Active").length;
  const outOfStockCount = PRODUCTS.filter(
    (p) => p.status === "Out of Stock",
  ).length;
  const totalSold = PRODUCTS.reduce((sum, p) => sum + p.sold, 0);

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">Products</h1>
          <p className="text-brand-mist-500">Manage your product catalog</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
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
          <p className="text-2xl font-bold text-brand-mist-800">
            {totalProducts}
          </p>
          <p className="text-xs text-brand-emerald-600 mt-1">+3 this month</p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Active</span>
            <Tag className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
          <p className="text-xs text-brand-mist-500 mt-1">Live products</p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Out of Stock</span>
            <Package className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
          <p className="text-xs text-red-600 mt-1">Needs restock</p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Total Sold</span>
            <Eye className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-brand-mist-800">
            {totalSold.toLocaleString()}
          </p>
          <p className="text-xs text-brand-emerald-600 mt-1">All time sales</p>
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
                <option value="active">Active</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="draft">Draft</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table - Desktop */}
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
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Sold
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Grade
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
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-brand-mist-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-brand-mist-100 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-brand-mist-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-brand-mist-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-brand-mist-500">
                        {product.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-mist-600">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-mist-800">
                  Rp {product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`font-medium ${
                      product.stock === 0
                        ? "text-red-600"
                        : product.stock < 30
                          ? "text-amber-600"
                          : "text-brand-mist-800"
                    }`}
                  >
                    {product.stock} pcs
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-mist-600">
                  {product.sold} sold
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(
                      product.grade,
                    )}`}
                  >
                    Grade {product.grade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      product.status,
                    )}`}
                  >
                    {product.status}
                  </span>
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

      {/* Products Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm"
          >
            <div className="flex items-start gap-4 mb-3">
              <div className="w-16 h-16 rounded-lg bg-brand-mist-100 flex items-center justify-center flex-shrink-0">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-brand-mist-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-brand-mist-800 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-brand-mist-500">{product.id}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      product.status,
                    )}`}
                  >
                    {product.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${getGradeColor(
                      product.grade,
                    )}`}
                  >
                    Grade {product.grade}
                  </span>
                  <span className="text-xs text-brand-mist-500">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <div>
                <span className="font-semibold text-brand-mist-800">
                  Rp {product.price.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span
                  className={`${
                    product.stock === 0 ? "text-red-600" : "text-brand-mist-600"
                  }`}
                >
                  Stock: {product.stock}
                </span>
                <span className="text-brand-mist-500">{product.sold} sold</span>
              </div>
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

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-brand-mist-200 shadow-sm">
          <p className="text-brand-mist-500">
            No products found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="px-4 md:px-6 py-4 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-brand-mist-500">
          Showing <span className="font-medium text-brand-mist-700">1</span> to{" "}
          <span className="font-medium text-brand-mist-700">
            {filteredProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-brand-mist-700">
            {PRODUCTS.length}
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
