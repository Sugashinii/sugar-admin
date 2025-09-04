// src/pages/Orders.jsx
import React, { useState } from "react"
import TableHeader from "../components/ui/TableHeader"
import MyButton from "../components/ui/MyButton"
import { MoreVertical } from "lucide-react"
import ReusableDropdown from "../components/ui/ReusableDropdown"

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: "ORD-101", customer: "Body Soda", product: "Face Cream", quantity: 2, status: "Pending" },
    { id: "ORD-102", customer: "Bullet Pandi", product: "Serum", quantity: 1, status: "Shipped" },
    { id: "ORD-103", customer: "Kaipulla", product: "Moisturizer", quantity: 3, status: "Delivered" },
    { id: "ORD-104", customer: "Alert Aarumugam", product: "Sunscreen", quantity: 1, status: "Cancelled" },
  ])

  const columns = ["Order ID", "Customer", "Product", "Quantity", "Status", "Actions"]

  const handleUpdate = (updatedRow) => {
    setOrders((prev) => prev.map((o) => (o.id === updatedRow.id ? updatedRow : o)))
  }

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id))
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <MyButton>Add New Order</MyButton>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <TableHeader columns={columns} />
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-6 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-rose-50 transition-colors">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.product}</td>
                  <td className="p-4">{order.quantity}</td>
                  <td className="p-4">{order.status}</td>
                  <td className="p-4 text-right">
                    <ReusableDropdown
                      trigger={
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <MoreVertical />
                        </button>
                      }
                      items={[
                        order.status === "Pending" && {
                          label: "Mark as Shipped",
                          onClick: () => handleUpdate({ ...order, status: "Shipped" }),
                        },
                        order.status === "Shipped" && {
                          label: "Mark as Delivered",
                          onClick: () => handleUpdate({ ...order, status: "Delivered" }),
                        },
                        order.status === "Pending" && {
                          label: "Cancel Order",
                          danger: true,
                          confirm: {
                            title: "Cancel this order?",
                            description: "This action cannot be undone.",
                            actionText: "Yes, Cancel",
                          },
                          onClick: () => handleUpdate({ ...order, status: "Cancelled" }),
                        },
                        { separator: true },
                        {
                          label: "Delete Order",
                          danger: true,
                          confirm: {
                            title: "Delete this order?",
                            description: "This will remove the order permanently.",
                            actionText: "Delete",
                          },
                          onClick: () => handleDelete(order.id),
                        },
                      ].filter(Boolean)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
