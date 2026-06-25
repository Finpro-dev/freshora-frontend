"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

interface StockSummaryTableProps {
  data: {
    productId: string;
    productName: string;
    storeId: string;
    storeName: string;
    totalAddition: number;
    totalDeduction: number;
    finalStock: number;
  }[];
}

export function StockSummaryTable({ data }: StockSummaryTableProps) {
  const columns = [
    {
      accessorKey: "productName",
      header: "Product",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
        <span className="text-sm font-medium text-brand-mist-800">{row.getValue("productName")}</span>
      ),
    },
    {
      accessorKey: "storeName",
      header: "Store",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
        <span className="text-sm text-brand-mist-600">{row.getValue("storeName")}</span>
      ),
    },
    {
      accessorKey: "totalAddition",
      header: "Addition",
      cell: ({ row }: { row: { getValue: (key: string) => number } }) => (
        <span className="text-sm text-right font-medium text-green-600">+ {row.getValue("totalAddition")}</span>
      ),
    },
    {
      accessorKey: "totalDeduction",
      header: "Deduction",
      cell: ({ row }: { row: { getValue: (key: string) => number } }) => (
        <span className="text-sm text-right font-medium text-red-600">- {row.getValue("totalDeduction")}</span>
      ),
    },
    {
      accessorKey: "finalStock",
      header: "Final Stock",
      cell: ({ row }: { row: { getValue: (key: string) => number } }) => (
        <span className="text-sm text-right font-medium">{row.getValue("finalStock")}</span>
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