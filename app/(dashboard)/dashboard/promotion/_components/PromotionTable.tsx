"use client";

import { Tag, Trash2 } from "lucide-react";
import { DiscountData } from "../_hooks/use-discount";

interface PromotionTableProps {
  discounts: DiscountData[];
  onDelete: (discountId: string) => void;
  isDeleting: boolean;
}

export default function PromotionTable({
  discounts,
  onDelete,
  isDeleting,
}: PromotionTableProps) {
  if (discounts.length === 0) return null;

  const getTypeBadge = (type: string) => {
    if (type === "BUY_ONE_GET_ONE")
      return "bg-purple-50 text-purple-700 border border-purple-200";
    if (type === "MIN_TRANSACTION")
      return "bg-blue-50 text-blue-700 border border-blue-200";
    return "bg-brand-emerald-50 text-brand-emerald-700 border border-brand-emerald-200";
  };

  const getTypeLabel = (type: string) => {
    if (type === "BUY_ONE_GET_ONE") return "BOGO";
    if (type === "MIN_TRANSACTION") return "Minimal Transaction";
    return "No Requirement";
  };

  return (
    <div className="bg-brand-mist-100/10 rounded-2xl border border-brand-mist-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-brand-mist-50/70 border-b border-brand-mist-200 text-xs font-bold text-brand-mist-500 uppercase tracking-wider">
            <th className="p-4">Promotion Targets</th>
            <th className="p-4">Promotion Type</th>
            <th className="p-4">Promo Amount</th>
            <th className="p-4">Eligibility Rules</th>
            <th className="p-4">Validity Period</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-brand-mist-100 text-brand-mist-700">
          {discounts.map((discount) => (
            <tr
              key={discount.discountId}
              className="hover:bg-brand-mist-50/40 transition-colors"
            >
              <td className="p-4 font-medium text-brand-mist-900">
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4 text-brand-emerald-600" />
                  <div>
                    {discount.product ? (
                      <>
                        <p className="font-bold text-brand-mist-800">
                          {discount.product.name}
                        </p>
                        <p className="text-xs text-brand-mist-400 mt-0.5">
                          Product-Specific Target Mapping
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-bold text-brand-emerald-700">
                          All Distributed Store Products
                        </p>
                        <p className="text-xs text-brand-mist-400 mt-0.5">
                          Global Store Voucher Architecture
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${getTypeBadge(discount.type)}`}
                >
                  {getTypeLabel(discount.type)}
                </span>
              </td>
              <td className="p-4 font-bold text-brand-mist-900">
                {discount.valueType === "PERCENTAGE"
                  ? `${discount.discountAmount}% Markdown`
                  : `Rp ${Number(discount.discountAmount).toLocaleString("id-ID")}`}
              </td>
              <td className="p-4 text-xs space-y-1 text-brand-mist-500 font-medium">
                {discount.minTransaction && (
                  <div>
                    • Min Transaction: Rp{" "}
                    {Number(discount.minTransaction).toLocaleString("id-ID")}
                  </div>
                )}
                {discount.maxDiscount && (
                  <div>
                    • Max Discount: Rp{" "}
                    {Number(discount.maxDiscount).toLocaleString("id-ID")}
                  </div>
                )}
                {!discount.minTransaction && !discount.maxDiscount && (
                  <span className="text-brand-mist-400 font-mono">
                    - None -
                  </span>
                )}
              </td>
              <td className="p-4 text-xs text-brand-mist-500 font-medium space-y-0.5">
                <div>
                  <span className="text-brand-mist-400 font-bold">Start: </span>
                  {new Date(discount.validFrom).toLocaleDateString("en-US", {
                    dateStyle: "medium",
                  })}
                </div>
                <div>
                  <span className="text-brand-mist-400 font-bold">End: </span>
                  {new Date(discount.validUntil).toLocaleDateString("en-US", {
                    dateStyle: "medium",
                  })}
                </div>
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => onDelete(discount.discountId)}
                  disabled={isDeleting}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Deprecate Rule"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
