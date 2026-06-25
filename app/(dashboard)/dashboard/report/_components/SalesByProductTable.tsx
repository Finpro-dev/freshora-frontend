"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

interface SalesByProductTableProps {
  data: {
    productId: string;
    productName: string;
    categoryName: string;
    totalSales: number;
    quantity: number;
  }[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export function SalesByProductTable({ data }: SalesByProductTableProps) {
  const columns = [
    {
      accessorKey: "productName",
      header: "Product",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
        <span className="text-sm font-medium text-brand-mist-800">{row.getValue("productName")}</span>
      ),
    },
    {
      accessorKey: "categoryName",
      header: "Category",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
        <span className="text-sm text-brand-mist-600">{row.getValue("categoryName")}</span>
      ),
    },
    {
      accessorKey: "totalSales",
      header: "Total Sales",
      cell: ({ row }: { row: { getValue: (key: string) => number } }) => (
        <span className="text-sm font-medium text-brand-emerald-600">
          {formatCurrency(row.getValue("totalSales"))}
        </span>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity Sold",
      cell: ({ row }: { row: { getValue: (key: string) => number } }) => (
        <span className="text-sm text-brand-mist-600">{row.getValue("quantity")} units</span>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-brand-mist-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-xs font-medium text-brand-mist-500 uppercase"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-brand-mist-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-brand-mist-50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}