import React from "react";
import StatusBadge from "./StatusBadge";
import MyButton from "./MyButton";

export default function TableRow({ row, onEdit, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2 text-sm">{row.id}</td>
      <td className="px-4 py-2 text-sm">{row.customer}</td>
      <td className="px-4 py-2 text-sm">{row.product}</td>
      <td className="px-4 py-2 text-sm">{row.quantity}</td>
      <td className="px-4 py-2">
        <StatusBadge status={row.status} />
      </td>
      <td className="px-4 py-2 flex gap-2">
        <MyButton variant="secondary" onClick={() => onEdit(row.id)}>
          Edit
        </MyButton>
        <MyButton variant="danger" onClick={() => onDelete(row.id)}>
          Delete
        </MyButton>
      </td>
    </tr>
  );
}
