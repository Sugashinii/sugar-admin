import React, { useState } from "react";
import TableHeader from "../components/ui/TableHeader";
import TableRow from "../components/ui/TableRow";
import MyButton from "../components/ui/MyButton";

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: "ORD-101", customer: "Body Soda", product: "Face Cream", quantity: 2, status: "Pending" },
    { id: "ORD-102", customer: "Bullet Pandi", product: "Serum", quantity: 1, status: "Shipped" },
    { id: "ORD-103", customer: "Kaipulla", product: "Moisturizer", quantity: 3, status: "Delivered" },
    { id: "ORD-104", customer: "Alert Aarumugam", product: "Sunscreen", quantity: 1, status: "Cancelled" },
  ]);

  const handleEdit = (id) => {
    console.log("Edit order:", id);
   
  };

  const handleDelete = (id) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const columns = ["Order ID", "Customer", "Product", "Quantity", "Status", "Actions"];

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <MyButton onClick={() => console.log("Add new order")}>Add New Order</MyButton>
      </div>

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
              orders.map(order => (
                <TableRow
                  key={order.id}
                  row={order}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
