import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UpdateDialog from "./UpdateDialog";
import ConfirmDialog from "./ConfirmDialog";

export default function RowActions({ row, onUpdate, onDelete }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5 text-slate-500 hover:text-rose-600" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => setShowUpdate(true)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setShowDelete(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Update Modal */}
      {showUpdate && (
        <UpdateDialog
          row={row}
          open={showUpdate}
          onClose={() => setShowUpdate(false)}
          onSave={onUpdate}
        />
      )}

      {/* Delete Modal */}
      {showDelete && (
        <ConfirmDialog
          open={showDelete}
          onClose={() => setShowDelete(false)}
          onConfirm={() => onDelete(row.id)}
        />
      )}
    </>
  );
}
