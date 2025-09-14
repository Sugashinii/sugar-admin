import React, { useState, useEffect } from "react"
import MyButton from "../components/ui/MyButton"
import { Plus, MoreVertical } from "lucide-react"
import { useNavigate } from "react-router-dom"
import DataTable from "../components/ui/DataTable"
import ReusableDropdown from "../components/ui/ReusableDropdown"
import { useToast } from "@/hooks/use-toast"

const Orders = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || []
    setOrders(savedOrders)
  }, [])

  const handleUpdate = (updatedOrder) => {
    const updatedOrders = orders.map((o) =>
      o.id === updatedOrder.id ? updatedOrder : o
    )
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    if (updatedOrder.status === "Shipped") {
      toast({
        title: "Order Shipped 🚚",
        description: `Order ${updatedOrder.id} has been shipped.`,
        className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg",
      })
    } else if (updatedOrder.status === "Delivered") {
      toast({
        title: "Order Delivered ✅",
        description: `Order ${updatedOrder.id} has been delivered successfully.`,
        className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg",
      })
    } else if (updatedOrder.status === "Cancelled") {
      toast({
        title: "Order Cancelled ❌",
        description: `Order ${updatedOrder.id} has been cancelled.`,
        className: "bg-black text-pink-200 border-0 rounded-lg shadow-lg",
      })
    }
  }

  const handleDelete = (orderToDelete) => {
    const updatedOrders = orders.filter((o) => String(o.id) !== String(orderToDelete.id))
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    toast({
      title: "Order Deleted ❌",
      description: `Order ${orderToDelete.id} has been removed permanently.`,
      className: "bg-black text-pink-200 border-0 rounded-lg shadow-lg",
    })
  }

  const columns = ["Order ID", "Customer", "Order Date", "Amount", "Status", "Actions"]

  return (
    <div className="min-h-[80vh] w-full p-8 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <MyButton onClick={() => navigate("/orders/add")}>
          <Plus className="w-4 h-4 inline-block mr-2" />
          Add New Order
        </MyButton>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <DataTable columns={columns}>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-6 text-gray-500">
                No orders yet. Click <b>Add New Order</b> to create one.
              </td>
            </tr>
          ) : (
            orders.filter(Boolean).map((order) => (
              <tr key={order.id} className="border-b hover:bg-rose-50 transition-colors">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">
                  ₹
                  {(order.orderItems || []).reduce(
                    (total, item) => total + (item.price || 0) * item.quantity,
                    0
                  )}
                </td>
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
                        onClick: () => handleUpdate({ ...order, status: "Cancelled" }),
                      },
                      { separator: true },
                      {
                        label: "Delete Order",
                        danger: true,
                        confirm: {
                          title: "Delete this order?",
                          description: "This will permanently remove the order.",
                          confirmLabel: "Delete",
                          confirmAction: () => handleDelete(order),
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
    </div>
  )
}

export default Orders
