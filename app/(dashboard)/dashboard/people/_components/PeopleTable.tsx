"use client";

import { UserCheck, UserX, Shield, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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

interface PeopleTableProps {
  users: UserType[];
  getRoleColor: (role: string) => string;
  formatDate: (date: string) => string;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export default function PeopleTable({
  users,
  getRoleColor,
  formatDate,
  onEdit,
  onDelete,
}: PeopleTableProps) {
  const router = useRouter();

  if (users.length === 0) return null;

  return (
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
          {users.map((user) => {
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
                      onClick={() => onEdit(user.userId)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                      onClick={() => onDelete(user.userId)}
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
  );
}
