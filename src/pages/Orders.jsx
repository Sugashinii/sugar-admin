import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: "ORD-101", customer: "Body Soda", product: "Face Cream", quantity: 2, status: "Pending" },
    { id: "ORD-102", customer: "Bullet Pandi", product: "Lipstick", quantity: 1, status: "Shipped" },
    { id: "ORD-103", customer: "Alert Aarumugam", product: "Shampoo", quantity: 3, status: "Delivered" },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-500 text-white";
      case "Shipped": return "bg-blue-500 text-white";
      case "Delivered": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleUpdate = (id) => {
    const updatedOrders = orders.map(order => {
      if (order.id === id) {
        let newStatus;
        switch (order.status) {
          case "Pending": newStatus = "Shipped"; break;
          case "Shipped": newStatus = "Delivered"; break;
          case "Delivered": newStatus = "Pending"; break;
          default: newStatus = "Pending";
        }
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <Card className="shadow-lg">
        <CardContent>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.customer}</td>
                  <td className="p-2 border">{order.product}</td>
                  <td className="p-2 border">{order.quantity}</td>
                  <td className="p-2 border">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-2 border space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleUpdate(order.id)}>
                      Update
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(order.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
