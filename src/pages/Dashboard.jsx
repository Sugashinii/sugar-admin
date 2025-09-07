import React from "react";
import DashboardCard from "../components/ui/DashboardCard";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Sales" value="₹50,000" />
        <DashboardCard title="Orders" value="1,500" />
        <DashboardCard title="Customers" value="320" />
        <DashboardCard title="Products" value="100" />
      </div>

     
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">ORD-101</td>
              <td>Body Soda</td>
              <td>
                <span className="px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </td>
              <td className="text-right">₹1,200</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">ORD-102</td>
              <td>Bullet Pandi</td>
              <td>
                <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-800">
                  Delivered
                </span>
              </td>
              <td className="text-right">₹800</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
