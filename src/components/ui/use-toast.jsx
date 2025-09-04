"use client"

import * as React from "react"
import { ToastProvider, ToastViewport, Toast } from "@/components/ui/toast"

const ToastContext = React.createContext()

export function useToast() {
  return React.useContext(ToastContext)
}

export function ToastProviderWrapper({ children }) {
  const [toasts, setToasts] = React.useState([])

  const addToast = (toast) => {
    setToasts((prev) => [...prev, { id: Date.now(), ...toast }])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastProvider>
        {children}
        <ToastViewport />
        {toasts.map((toast) => (
          <Toast key={toast.id} onOpenChange={() => removeToast(toast.id)}>
            {toast.message}
          </Toast>
        ))}
      </ToastProvider>
    </ToastContext.Provider>
  )
}
