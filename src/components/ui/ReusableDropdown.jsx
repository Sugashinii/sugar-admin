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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {items.map((item, i) =>
            item.separator ? (
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
                className={item.danger ? "text-red-600 focus:bg-red-100" : ""}
              >
                {item.label}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

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
