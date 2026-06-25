"use client";

import { Eye, Edit, Trash2, Image as ImageIcon } from "lucide-react";

interface ProductTableProps {
  products: any[];
  isSuperAdmin: boolean;
  getGradeColor: (grade: string) => string;
  getStatusColor: (status: string) => string;
  onView: (productId: string) => void;
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
}

export default function ProductTable({
  products,
  isSuperAdmin,
  getGradeColor,
  getStatusColor,
  onView,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (products.length === 0) return null;

  return (
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
              Weight/Unit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
              Grade
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
              Status
            </th>
            {isSuperAdmin && (
              <th className="px-6 py-3 text-right text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-mist-200">
          {products.map((product) => {
            const stock = product.stocks?.[0]?.quantity ?? 0;
            const status = stock === 0 ? "Out of Stock" : "Active";
            const photoUrl = product.productPhotos?.[0]?.photoUrl;

            return (
              <tr
                key={product.productId}
                className="hover:bg-brand-mist-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-brand-mist-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-brand-mist-200">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
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
                        {product.serialNumber}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-mist-600">
                  {product.productCategory?.category || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-mist-800">
                  Rp {Number(product.finalPrice).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`font-medium ${stock === 0 ? "text-red-600" : "text-brand-mist-800"}`}
                  >
                    {stock} pcs
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-mist-600">
                  {product.weightPerGram}g / {product.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(product.grade)}`}
                  >
                    Grade {product.grade || "-"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
                  >
                    {status}
                  </span>
                </td>
                {isSuperAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 rounded-lg hover:bg-emerald-100 text-brand-emerald-600 transition-colors"
                        onClick={() => onView(product.productId)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                        onClick={() => onEdit(product.productId)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                        onClick={() => onDelete(product.productId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
