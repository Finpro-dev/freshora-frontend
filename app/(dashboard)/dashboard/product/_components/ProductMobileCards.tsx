"use client";

import { Eye, Edit, Trash2, Image as ImageIcon } from "lucide-react";

interface ProductMobileCardsProps {
  products: any[];
  isSuperAdmin: boolean;
  getGradeColor: (grade: string) => string;
  getStatusColor: (status: string) => string;
  onView: (productId: string) => void;
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
}

export default function ProductMobileCards({
  products,
  isSuperAdmin,
  getGradeColor,
  getStatusColor,
  onView,
  onEdit,
  onDelete,
}: ProductMobileCardsProps) {
  if (products.length === 0) return null;

  return (
    <div className="lg:hidden space-y-4">
      {products.map((product) => {
        const stock = product.stocks?.[0]?.quantity ?? 0;
        const status = stock === 0 ? "Out of Stock" : "Active";
        const photoUrl = product.productPhotos?.[0]?.photoUrl;

        return (
          <div key={product.productId} className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-16 h-16 rounded-lg bg-brand-mist-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-brand-mist-200">
                {photoUrl ? (
                  <img src={photoUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-brand-mist-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-brand-mist-800 truncate">{product.name}</p>
                    <p className="text-xs text-brand-mist-500">{product.serialNumber}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getGradeColor(product.grade)}`}>
                    Grade {product.grade || "-"}
                  </span>
                  <span className="text-xs text-brand-mist-500">{product.productCategory?.category}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <div>
                <span className="font-semibold text-brand-mist-800">Rp {Number(product.finalPrice).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className={stock === 0 ? "text-red-600" : "text-brand-mist-600"}>Stock: {stock}</span>
                <span className="text-brand-mist-500">{product.weightPerGram}g / {product.unit}</span>
              </div>
            </div>
            {isSuperAdmin && (
              <div className="flex items-center gap-2 pt-3 border-t border-brand-mist-200">
                <button onClick={() => onView(product.productId)} className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-brand-emerald-50 text-brand-emerald-600 text-xs font-medium hover:bg-brand-emerald-100 transition-colors">
                  <Eye className="w-3 h-3" /> View
                </button>
                <button onClick={() => onEdit(product.productId)} className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors">
                  <Edit className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => onDelete(product.productId)} className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}