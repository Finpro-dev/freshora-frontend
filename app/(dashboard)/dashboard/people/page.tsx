"use client"; // <--- WAJIB ditambahkan di baris paling atas untuk Next.js App Router
import { useGetUser } from "./_hooks/use-get-user";
import { useDeleteStoreAdmin } from "./_hooks/use-delete-store-admin";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { toast } from "sonner";
import {
  Plus,
  Search,
  ChevronDown,
  UserCheck,
  UserX,
  Shield,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUpdateStoreAdmin } from "./_hooks/use-update-store-admin";
// ^ Pastikan import icon disesuaikan dengan library yang kamu pakai

// Simulasi fungsi warna role jika belum kamu buat
const getRoleColor = (role: string) => {
  switch (role?.toUpperCase()) {
    case "SUPER_ADMIN":
      return "bg-purple-100 text-purple-800";
    case "STORE_ADMIN":
      return "bg-blue-100 text-blue-800";
    case "CUSTOMER":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Asumsi tipe data dari API (Opsional, hapus jika tidak pakai TypeScript)
interface UserType {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  gender: string;
  role: string;
  isVerified: boolean;
  avatar: string | null;
  myReferralCode: string;
  usedReferralCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function PeoplePage() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  if (role === "STORE_ADMIN") {
    router.replace("/unauthorized");
    return null;
  }
  const { data: users } = useGetUser();
  const { mutate: deleteStoreAdmin } = useDeleteStoreAdmin();
  const handleDeleteStoreAdmin = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      theme: "auto",
      text: "You won't be able to undo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009966",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = deleteStoreAdmin(userId);
      }
    });
  };
  const handleAddStoreAdmin = () => {
    return router.push(`/dashboard/people/add-store-admin`);
  };
  const handleUpdateStoreAdmin = (userId: string) => {
    return router.push(`/dashboard/people/${userId}`);
  };
  const usersData: UserType[] = users?.data?.users || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Melakukan filter langsung dari data API (usersData)
  const filteredUsers = usersData.filter((user) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`
      .trim()
      .toLowerCase();
    const email = (user.email || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesSearch = fullName.includes(search) || email.includes(search);

    const matchesRole =
      roleFilter === "all" ||
      (user.role && user.role.toLowerCase() === roleFilter.toLowerCase());

    return matchesSearch && matchesRole;
  });

  // Helper format tanggal lahir/gabung (misal: "20 Jun 2026")
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
        <button
          className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium"
          onClick={() => handleAddStoreAdmin()}
        >
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
            {filteredUsers.map((user) => {
              const fullName =
                `${user.firstName || ""} ${user.lastName || ""}`.trim();
              const initials =
                `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();

              return (
                <tr
                  key={user.userId}
                  className="hover:bg-brand-mist-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-brand-emerald-100 flex items-center justify-center mr-4 overflow-hidden">
                        {user.avatar ? (
                          /* Menggunakan img biasa agar fleksibel dengan domain eksternal avatar Google */
                          <img
                            src={user.avatar}
                            alt={fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-medium text-brand-emerald-700">
                            {initials || "U"}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-brand-mist-800">
                          {fullName || "No Name"}
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
                      {user.role ? user.role.replace("_", " ") : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`flex items-center gap-1.5 text-sm ${user.isVerified ? "text-brand-emerald-600" : "text-red-600"}`}
                    >
                      {user.isVerified ? (
                        <>
                          <UserCheck className="w-4 h-4" /> Active
                        </>
                      ) : (
                        <>
                          <UserX className="w-4 h-4" /> Unverified
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-brand-mist-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-brand-emerald-100 text-brand-emerald-600 transition-colors">
                        <Shield className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                        onClick={() => handleUpdateStoreAdmin(user.userId)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                        onClick={() => handleDeleteStoreAdmin(user.userId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Users Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => {
          const fullName =
            `${user.firstName || ""} ${user.lastName || ""}`.trim();
          const initials =
            `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();

          return (
            <div
              key={user.userId}
              className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-emerald-100 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium text-brand-emerald-700">
                        {initials || "U"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-brand-mist-800">
                      {fullName || "No Name"}
                    </p>
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
                    {user.role ? user.role.replace("_", " ") : "-"}
                  </span>
                  <span
                    className={`flex items-center gap-1 text-xs ${user.isVerified ? "text-brand-emerald-600" : "text-red-600"}`}
                  >
                    {user.isVerified ? (
                      <>
                        <UserCheck className="w-3 h-3" /> Active
                      </>
                    ) : (
                      <>
                        <UserX className="w-3 h-3" /> Unverified
                      </>
                    )}
                  </span>
                </div>
                <span className="text-xs text-brand-mist-500">
                  {formatDate(user.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-brand-mist-200">
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-brand-emerald-50 text-brand-emerald-600 text-xs font-medium hover:bg-brand-emerald-100 transition-colors">
                  <Shield className="w-3 h-3" /> Permissions
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors">
                  <Edit className="w-3 h-3" /> Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-brand-mist-200 shadow-sm">
          <p className="text-brand-mist-500">
            No users found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination info */}
      <div className="px-4 md:px-6 py-4 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-brand-mist-500">
          Showing <span className="font-medium text-brand-mist-700">1</span> to{" "}
          <span className="font-medium text-brand-mist-700">
            {filteredUsers.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-brand-mist-700">
            {usersData.length}
          </span>{" "}
          results
        </p>
        {/* Pagination buttons... */}
      </div>
    </div>
  );
}
