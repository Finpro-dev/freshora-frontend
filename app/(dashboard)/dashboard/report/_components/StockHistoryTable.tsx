"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

interface StockHistoryTableProps {
  data: {
    stockJournalId: string;
    productId: string;
    productName: string;
    storeId: string;
    storeName: string;
    quantityChange: number;
    type: string;
    updatedBy: string | null;
    createdAt: string;
  }[];
}

export function StockHistoryTable({ data }: StockHistoryTableProps) {
  const columns = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
        <span className="text-sm text-brand-mist-600">
          {new Date(row.getValue("createdAt")).toLocaleDateString("id-ID")}
        </span>
      ),
    },
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
      accessorKey: "quantityChange",
      header: "Change",
      cell: ({ row }: { row: { getValue: (key: string) => number } }) => {
        const change = row.getValue("quantityChange");
        return (
          <span className={`text-sm font-medium ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}>
            {change >= 0 ? `+${change}` : change}
          </span>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
        <span className="text-sm text-brand-mist-600">
          {row.getValue("type").replace(/_/g, " ")}
        </span>
      ),
    },
    {
      accessorKey: "updatedBy",
      header: "Updated By",
      cell: ({ row }: { row: { getValue: (key: string) => string | null } }) => (
        <span className="text-sm text-brand-mist-600">{row.getValue("updatedBy") || "-"}</span>
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