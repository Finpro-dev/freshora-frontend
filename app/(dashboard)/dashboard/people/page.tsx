"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { useRouter } from "next/navigation";
import { useGetUser } from "./_hooks/use-get-user";
import { useDeleteStoreAdmin } from "./_hooks/use-delete-store-admin";
import { toast } from "sonner";
import PeopleHeader from "./_components/PeopleHeader";
import PeopleFilters from "./_components/PeopleFilters";
import PeopleTable from "./_components/PeopleTable";
import PeopleMobileCards from "./_components/PeopleMobileCards";

// Tipe data user dari API
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

const ITEMS_PER_PAGE = 10;

export default function PeoplePage() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);

  // Auth guard: STORE_ADMIN tidak bisa akses
  if (role === "STORE_ADMIN") {
    router.replace("/unauthorized");
    return null;
  }

  // Data fetching
  const { data: users } = useGetUser();
  const { mutate: deleteStoreAdmin } = useDeleteStoreAdmin();
  const usersData: UserType[] = users?.data?.users || [];

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page ke 1 saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  // Filter logic
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

  // Pagination logic
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE),
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Handlers
  const handleAddStoreAdmin = () =>
    router.push("/dashboard/people/add-store-admin");
  const handleUpdateStoreAdmin = (userId: string) =>
    router.push(`/dashboard/people/${userId}`);

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
        deleteStoreAdmin(userId);
        toast.success("User deleted successfully");
      }
    });
  };

  // Helper: format tanggal
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper: warna role badge
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

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8">
      <PeopleHeader onAdd={handleAddStoreAdmin} />
      <PeopleFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
      />
      <PeopleTable
        users={paginatedUsers}
        getRoleColor={getRoleColor}
        formatDate={formatDate}
        onEdit={handleUpdateStoreAdmin}
        onDelete={handleDeleteStoreAdmin}
      />
      <PeopleMobileCards
        users={paginatedUsers}
        getRoleColor={getRoleColor}
        formatDate={formatDate}
        onEdit={handleUpdateStoreAdmin}
        onDelete={handleDeleteStoreAdmin}
      />

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-brand-mist-200 shadow-sm">
          <p className="text-brand-mist-500">
            No users found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="px-4 md:px-6 py-4 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-brand-mist-500">
            Showing{" "}
            <span className="font-medium text-brand-mist-700">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-brand-mist-700">{endIndex}</span>{" "}
            of{" "}
            <span className="font-medium text-brand-mist-700">
              {filteredUsers.length}
            </span>{" "}
            results
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 bg-white border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold text-sm shadow-sm text-brand-mist-700 hover:bg-brand-mist-50 transition-colors"
              >
                ← Prev
              </button>

              <span className="px-3 py-1.5 bg-brand-mist-50 border border-brand-mist-300 rounded-lg text-sm font-bold text-brand-mist-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1.5 bg-white border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold text-sm shadow-sm text-brand-mist-700 hover:bg-brand-mist-50 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
