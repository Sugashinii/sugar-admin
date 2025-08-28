import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"; // relative path
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./alert-dialog"; // relative path

export default function TableRow({ row, onEdit, onDelete }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2 text-sm">{row.id}</td>
      <td className="px-4 py-2 text-sm">{row.customer}</td>
      <td className="px-4 py-2 text-sm">{row.product}</td>
      <td className="px-4 py-2 text-sm">{row.quantity}</td>
      <td className="px-4 py-2">
        <StatusBadge status={row.status} />
      </td>
      <td className="px-4 py-2 text-right">
        {/* 3-dot menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded hover:bg-gray-100">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => onEdit(row)}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Delete confirmation dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete order{" "}
                <span className="font-semibold">{row.id}</span>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={() => onDelete(row.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  );
}
