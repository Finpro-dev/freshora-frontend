"use client";
import { useGetUser } from "./_hooks/use-get-user";
import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Shield,
  UserCheck,
  UserX,
  ChevronDown,
  Edit,
  Trash2,
} from "lucide-react";

const USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "STORE_ADMIN",
    status: "Active",
    joined: "2024-01-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "CUSTOMER",
    status: "Active",
    joined: "2024-01-08",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "STORE_ADMIN",
    status: "Inactive",
    joined: "2024-01-05",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "CUSTOMER",
    status: "Active",
    joined: "2024-01-01",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "SUPER_ADMIN",
    status: "Active",
    joined: "2023-12-28",
  },
];

function getRoleColor(role: string) {
  switch (role) {
    case "SUPER_ADMIN":
      return "bg-purple-100 text-purple-700";
    case "STORE_ADMIN":
      return "bg-brand-emerald-100 text-brand-emerald-700";
    case "CUSTOMER":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-brand-mist-200 text-brand-mist-700";
  }
}

export default function PeoplePage() {
  const { data: users = [] } = useGetUser();
  console.log("Fetched users:", users);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = USERS.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "all" || user.role.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">People</h1>
          <p className="text-brand-mist-500">
            Manage users, store admins, and permissions
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add Store Admin
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-mist-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full sm:w-auto appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
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

      {/* Users Table - Desktop */}
      <div className="hidden md:block bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-mist-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-mist-200">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-brand-mist-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-emerald-100 flex items-center justify-center mr-4">
                      <span className="text-sm font-medium text-brand-emerald-700">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-brand-mist-800">
                        {user.name}
                      </p>
                      <p className="text-sm text-brand-mist-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                  >
                    {user.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`flex items-center gap-1.5 text-sm ${user.status === "Active" ? "text-brand-emerald-600" : "text-red-600"}`}
                  >
                    {user.status === "Active" ? (
                      <UserCheck className="w-4 h-4" />
                    ) : (
                      <UserX className="w-4 h-4" />
                    )}
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-brand-mist-500">
                  {user.joined}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-brand-emerald-100 text-brand-emerald-600 transition-colors">
                      <Shield className="w-4 h-4" />
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

      {/* Users Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-emerald-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-brand-emerald-700">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-brand-mist-800">{user.name}</p>
                  <p className="text-sm text-brand-mist-500">{user.email}</p>
                </div>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-brand-mist-200 transition-colors">
                <MoreVertical className="w-5 h-5 text-brand-mist-500" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                >
                  {user.role.replace("_", " ")}
                </span>
                <span
                  className={`flex items-center gap-1 text-xs ${user.status === "Active" ? "text-brand-emerald-600" : "text-red-600"}`}
                >
                  {user.status === "Active" ? (
                    <UserCheck className="w-3 h-3" />
                  ) : (
                    <UserX className="w-3 h-3" />
                  )}
                  {user.status}
                </span>
              </div>
              <span className="text-xs text-brand-mist-500">{user.joined}</span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-brand-mist-200">
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-brand-emerald-50 text-brand-emerald-600 text-xs font-medium hover:bg-brand-emerald-100 transition-colors">
                <Shield className="w-3 h-3" />
                Permissions
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

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-brand-mist-200 shadow-sm">
          <p className="text-brand-mist-500">
            No users found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="px-4 md:px-6 py-4 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-brand-mist-500">
          Showing <span className="font-medium text-brand-mist-700">1</span> to{" "}
          <span className="font-medium text-brand-mist-700">
            {filteredUsers.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-brand-mist-700">
            {USERS.length}
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
