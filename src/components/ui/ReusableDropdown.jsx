"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

export default function ReusableDropdown({ trigger, items }) {
  const [confirmItem, setConfirmItem] = useState(null)

  return (
    <>
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white border shadow-md rounded-md py-1 w-40"
        >
          {items.map((item, i) =>
            item.type === "separator" || item.separator ? (
              <DropdownMenuSeparator key={i} />
            ) : (
              <DropdownMenuItem
                key={i}
                onClick={() => {
                  if (item.confirm) {
                    setConfirmItem(item)
                  } else {
                    item.onClick?.()
                  }
                }}
                className={`px-4 py-2 rounded-md text-sm transition-colors
                  ${
                    item.danger
                      ? "text-red-600 hover:bg-red-50 focus:bg-red-100"
                      : "text-gray-700 hover:bg-gray-100 focus:bg-gray-200"
                  }
                `}
              >
                {item.label}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Alert Dialog for Confirmation */}
      <AlertDialog
        open={!!confirmItem}
        onOpenChange={() => setConfirmItem(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmItem?.confirm?.title || "Are you sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmItem?.confirm?.description ||
                "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // ✅ Call the actual onClick defined in your item (delete, cancel, etc.)
                confirmItem?.onClick?.()
                setConfirmItem(null)
              }}
            >
              {confirmItem?.confirm?.actionText || "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
