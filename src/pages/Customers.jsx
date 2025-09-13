import React, { useState } from "react"
import MyButton from "../components/ui/MyButton"
import ReusableDropdown from "../components/ui/ReusableDropdown"
import { MoreVertical, Plus } from "lucide-react"
import AddCustomer from "./AddCustomer"
import DataTable from "../components/ui/DataTable"
import { useToast } from "@/hooks/use-toast"   // 👈 import toast

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: "CUST-101", name: "Body Soda", email: "body@example.com", subscription: "Gold", invoices: 3, status: "Active" },
    { id: "CUST-102", name: "Bullet Pandi", email: "bullet@example.com", subscription: "Silver", invoices: 1, status: "Inactive" },
    { id: "CUST-103", name: "Kaipulla", email: "kaipulla@example.com", subscription: "Platinum", invoices: 5, status: "Active" },
    { id: "CUST-104", name: "Alert Aarumugam", email: "alert@example.com", subscription: "Gold", invoices: 2, status: "Inactive" },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const { toast } = useToast()   // 👈 use toast hook

  const handleAddCustomer = (customer) => {
    setCustomers((prev) => [...prev, customer])
  }

  const handleUpdate = (updatedCustomer) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    )

    // ✅ Toast for block/unblock
    if (updatedCustomer.status === "Inactive") {
      toast({
        title: "Customer Blocked 🚫",
        description: `${updatedCustomer.name} has been blocked.`,
        className: "bg-black text-pink-200 border-0 rounded-lg shadow-lg",
      })
    } else if (updatedCustomer.status === "Active") {
      toast({
        title: "Customer Unblocked ✅",
        description: `${updatedCustomer.name} is active again.`,
        className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg",
      })
    }
  }

  const handleDelete = (id) => {
    const deletedCustomer = customers.find((c) => c.id === id)
    setCustomers((prev) => prev.filter((c) => c.id !== id))

    // ✅ Toast for delete
    if (deletedCustomer) {
      toast({
        title: "Customer Deleted ❌",
        description: `${deletedCustomer.name} has been removed permanently.`,
        className: "bg-black text-pink-200 border-0 rounded-lg shadow-lg",
      })
    }
  }

  if (showAddForm) {
    return (
      <AddCustomer
        onAdd={handleAddCustomer}
        onCancel={() => setShowAddForm(false)}
      />
    )
  }

  const columns = ["ID", "Name", "Email", "Subscription", "Invoices", "Status", "Actions"]

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <MyButton onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 inline-block mr-2" />
          Add Customer
        </MyButton>
      </div>

      <DataTable columns={columns}>
        {customers.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="p-6 text-center text-gray-500">
              No customers yet.
            </td>
          </tr>
        ) : (
          customers.map((customer) => (
            <tr key={customer.id} className="border-b hover:bg-blue-50 transition-colors">
              <td className="p-4">{customer.id}</td>
              <td className="p-4">{customer.name}</td>
              <td className="p-4">{customer.email}</td>
              <td className="p-4">{customer.subscription}</td>
              <td className="p-4">{customer.invoices}</td>
              <td className="p-4">{customer.status}</td>
              <td className="p-4 text-right">
                <ReusableDropdown
                  trigger={
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical />
                    </button>
                  }
                  items={[
                    customer.status === "Active" && {
                      label: "Block User",
                      danger: true,
                      confirm: {
                        title: "Block this customer?",
                        description: "They will not be able to log in anymore.",
                        confirmLabel: "Block",
                        confirmAction: () =>
                          handleUpdate({ ...customer, status: "Inactive" }),
                      },
                    },
                    customer.status === "Inactive" && {
                      label: "Unblock User",
                      confirm: {
                        title: "Unblock this customer?",
                        description: "They will be able to log in again.",
                        confirmLabel: "Unblock",
                        confirmAction: () =>
                          handleUpdate({ ...customer, status: "Active" }),
                      },
                    },
                    { separator: true },
                    {
                      label: "Delete Customer",
                      danger: true,
                      confirm: {
                        title: "Delete this customer?",
                        description: "This will permanently remove the customer record.",
                        confirmLabel: "Delete",
                        confirmAction: () => handleDelete(customer.id),
                      },
                    },
                  ].filter(Boolean)}
                />
              </td>
            </tr>
          ))
        )}
      </DataTable>
    </div>
  )
}

export default Customers
