import React from "react";
import { MoreVertical } from "lucide-react";
import { DropdownMenuReusable } from "@/components/ui/dropdown-menu";

export default function RowActions({ row, onUpdate, onDelete }) {
  return (
    <DropdownMenuReusable
      trigger={
        <button className="p-2 rounded hover:bg-rose-50">
          <MoreVertical className="h-5 w-5 text-slate-500 hover:text-rose-600" />
        </button>
      }
      items={[
        {
          label: "Mark as Shipped",
          onClick: () => onUpdate({ ...row, status: "Shipped" }),
        },
        {
          label: "Mark as Delivered",
          onClick: () => onUpdate({ ...row, status: "Delivered" }),
        },
        {
          label: "Cancel Order",
          danger: true,
          confirm: {
            title: "Cancel this order?",
            description: `Order ${row.id} will be marked as cancelled.`,
            confirmLabel: "Cancel Order",
            confirmAction: () => onUpdate({ ...row, status: "Cancelled" }),
          },
        },
        { type: "separator" },
        {
          label: "Delete Order",
          danger: true,
          confirm: {
            title: "Delete this order?",
            description: `Are you sure you want to permanently delete order ${row.id}?`,
            confirmLabel: "Delete",
            confirmAction: () => onDelete(row.id),
          },
        },
      ]}
    />
  );
}
