import React from "react";
import DashboardCard from "../components/ui/DashboardCard";

export default function Dashboard() {
  return (
    <div className="ml-30 p-10 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Sales" value="₹50,000" />
        <DashboardCard title="Orders" value="1,500" />
        <DashboardCard title="Customers" value="320" />
        <DashboardCard title="Products" value="100" />
      </div>
    </div>
  );
}
