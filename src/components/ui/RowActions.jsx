import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import MyButton from "@/components/ui/MyButton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function RowActions({ row, onUpdate, onDelete }) {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(row.status);

  return (
    <div className="flex items-center gap-2">
      {/* 3-dot Kebab button */}
      <button
        onClick={() => setShowUpdateDialog(true)}
        className="p-2 rounded hover:bg-rose-50"
      >
        <MoreVertical className="h-5 w-5 text-slate-500 hover:text-rose-600" />
      </button>

      {/* Update AlertDialog */}
      <AlertDialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Update Status
            </AlertDialogTitle>
            <AlertDialogDescription>
              Change the status of order <span className="font-semibold">{row.id}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <select
            className="w-full p-2 border rounded mb-4"
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowUpdateDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-pink-600 hover:bg-pink-700 text-white"
              onClick={() => {
                onUpdate({ ...row, status: updatedStatus });
                setShowUpdateDialog(false);
              }}
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete AlertDialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Delete Order
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete order <span className="font-semibold">{row.id}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                onDelete(row.id);
                setShowDeleteDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete icon button */}
      <button
        onClick={() => setShowDeleteDialog(true)}
        className="p-2 rounded hover:bg-rose-50 text-red-500"
      >
        Delete
      </button>
    </div>
  );
}
