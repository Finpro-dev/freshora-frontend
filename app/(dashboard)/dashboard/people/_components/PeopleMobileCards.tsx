"use client";

import {
  UserCheck,
  UserX,
  Shield,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";

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

interface PeopleMobileCardsProps {
  users: UserType[];
  getRoleColor: (role: string) => string;
  formatDate: (date: string) => string;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export default function PeopleMobileCards({
  users,
  getRoleColor,
  formatDate,
  onEdit,
  onDelete,
}: PeopleMobileCardsProps) {
  if (users.length === 0) return null;

  return (
    <div className="md:hidden space-y-4">
      {users.map((user) => {
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
              <button
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors"
                onClick={() => onEdit(user.userId)}
              >
                <Edit className="w-3 h-3" /> Edit
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                onClick={() => onDelete(user.userId)}
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
