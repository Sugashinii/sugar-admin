// src/pages/Orders.jsx
import React, { useState } from "react";
import MyButton from "../components/ui/MyButton";
import { MoreVertical, Plus } from "lucide-react";
import ReusableDropdown from "../components/ui/ReusableDropdown";
import DataTable from "../components/ui/DataTable";

// Payment Modal
const PaymentModal = ({ totalAmount, onClose, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">Payment</h2>
        <p className="mb-2">Total Amount: ₹{totalAmount}</p>
        <label className="block mb-4">
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border mt-1 w-full p-2 rounded"
          >
            <option value="Cash">Cash</option>
            <option value="Digital">Digital</option>
          </select>
        </label>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => onConfirm(paymentMethod)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-101",
      customer: "Body Soda",
      amount: 400,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    },
    {
      id: "ORD-102",
      customer: "Bullet Pandi",
      amount: 500,
      status: "Shipped",
      date: new Date().toLocaleDateString(),
    },
  ]);

  const columns = ["Order ID", "Customer", "Order Date", "Amount", "Status", "Actions"];

  // Create Order states
  const [showForm, setShowForm] = useState(false);
  const [newOrder, setNewOrder] = useState({ customer: "", products: [{ name: "", qty: 1, price: 0 }] });
  const [showPayment, setShowPayment] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // Update & Delete Handlers
  const handleUpdate = (updatedRow) => {
    setOrders((prev) => prev.map((o) => (o.id === updatedRow.id ? updatedRow : o)));
  };
  const handleDelete = (id) => setOrders((prev) => prev.filter((o) => o.id !== id));

  // Create Order Handlers
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...newOrder.products];
    updatedProducts[index][field] = field === "qty" || field === "price" ? Number(value) : value;
    setNewOrder({ ...newOrder, products: updatedProducts });
  };
  const addProductRow = () =>
    setNewOrder({ ...newOrder, products: [...newOrder.products, { name: "", qty: 1, price: 0 }] });
  const removeProductRow = (index) => {
    const updatedProducts = newOrder.products.filter((_, i) => i !== index);
    setNewOrder({ ...newOrder, products: updatedProducts });
  };
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const amount = newOrder.products.reduce((sum, p) => sum + p.qty * p.price, 0);
    setTotalAmount(amount);
    setShowPayment(true);
  };
  const confirmPayment = (method) => {
    const orderId = `ORD-${Math.floor(Math.random() * 1000 + 200)}`;
    const amount = newOrder.products.reduce((sum, p) => sum + p.qty * p.price, 0);
    const date = new Date().toLocaleDateString();
    setOrders([
      ...orders,
      {
        id: orderId,
        customer: newOrder.customer,
        amount,
        status: "Pending",
        date,
      },
    ]);
    setNewOrder({ customer: "", products: [{ name: "", qty: 1, price: 0 }] });
    setShowPayment(false);
    setShowForm(false);
    alert(`Order created with ${method} payment`);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <MyButton onClick={() => setShowForm((prev) => !prev)}>
          <Plus className="w-4 h-4 inline-block mr-2" /> Add New Order
        </MyButton>
      </div>

      {/* Create Order Form */}
      {showForm && (
        <form className="mb-6 p-4 bg-white rounded shadow" onSubmit={handleSubmitOrder}>
          <input
            placeholder="Customer Name"
            className="border p-2 w-full mb-2 rounded"
            value={newOrder.customer}
            onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
            required
          />
          {newOrder.products.map((p, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                placeholder="Product Name"
                value={p.name}
                onChange={(e) => handleProductChange(i, "name", e.target.value)}
                className="border p-2 rounded flex-1"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={p.qty}
                onChange={(e) => handleProductChange(i, "qty", e.target.value)}
                className="border p-2 rounded w-24"
                min={1}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={p.price}
                onChange={(e) => handleProductChange(i, "price", e.target.value)}
                className="border p-2 rounded w-24"
                min={0}
                required
              />
              {newOrder.products.length > 1 && (
                <button type="button" onClick={() => removeProductRow(i)} className="text-red-500">
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addProductRow} className="text-blue-500 mb-2">
            + Add Product
          </button>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded ml-2">
            Submit Order
          </button>
        </form>
      )}

      {/* Orders Table */}
      <DataTable columns={columns}>
        {orders.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="p-6 text-center text-gray-500">
              No orders yet. Click <b>Add New Order</b> to create one.
            </td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-rose-50 transition-colors">
              <td className="p-4">{order.id}</td>
              <td className="p-4">{order.customer}</td>
              <td className="p-4">{order.date}</td>
              <td className="p-4">₹{order.amount}</td>
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
      </DataTable>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal totalAmount={totalAmount} onClose={() => setShowPayment(false)} onConfirm={confirmPayment} />
      )}
    </div>
  );
};

export default Orders;
