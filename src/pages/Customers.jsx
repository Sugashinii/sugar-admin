import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MyButton from "../components/ui/MyButton"
import ReusableDropdown from "../components/ui/ReusableDropdown"
import { MoreVertical, Plus } from "lucide-react"
import AddCustomer from "./AddCustomer"
import DataTable from "../components/ui/DataTable"
import { useToast } from "@/hooks/use-toast"

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: "CUST-101", name: "Body Soda", email: "body@example.com", phone: "9876543210", address: "Chennai", invoices: 3 },
    { id: "CUST-102", name: "Bullet Pandi", email: "bullet@example.com", phone: "9123456780", address: "Madurai", invoices: 1 },
    { id: "CUST-103", name: "Kaipulla", email: "kaipulla@example.com", phone: "9988776655", address: "Coimbatore", invoices: 5 },
    { id: "CUST-104", name: "Alert Aarumugam", email: "alert@example.com", phone: "9090909090", address: "Salem", invoices: 2 },
  ])

  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {

    setShowAddForm(location.pathname.endsWith("/add"))
  }, [location.pathname])

  const handleAddCustomer = (customer) => {
    if (customers.some((c) => c.id === customer.id)) {
      toast({
        title: "Customer Already Exists ⚠️",
        description: `${customer.name} is already in the list.`,
        className: "bg-yellow-500 text-white border-0 rounded-lg shadow-lg",
      })
      return
    }

    setCustomers((prev) => [...prev, customer])
    toast({
      title: "Customer Added 🎉",
      description: `${customer.name} has been added successfully!`,
      className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg",
    })

    navigate("/customers", { replace: true })
  }

  const handleDelete = (id) => {
    const deletedCustomer = customers.find((c) => c.id === id)
    setCustomers((prev) => prev.filter((c) => c.id !== id))

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
        onCancel={() => navigate("/customers")}
        existingCustomers={customers}
      />
    )
  }

  const columns = ["ID", "Name", "Email", "Phone", "Address", "Invoices", "Actions"]

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <MyButton onClick={() => navigate("/customers/add")}>
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
              <td className="p-4">{customer.phone}</td>
              <td className="p-4">{customer.address}</td>
              <td className="p-4">{customer.invoices}</td>
              <td className="p-4 text-right">
                <ReusableDropdown
                  trigger={
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical />
                    </button>
                  }
                  items={[
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
                  ]}
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
