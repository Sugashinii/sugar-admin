// src/pages/Customers.jsx
import React, { useState } from "react";
import TableHeader from "../components/ui/TableHeader";
import MyButton from "../components/ui/MyButton";
import  ReusableDropdown from "../components/ui/ReusableDropdown";
import { MoreVertical } from "lucide-react";

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: "CUST-101", name: "Body Soda", email: "body@example.com", subscription: "Gold", invoices: 3, status: "Active" },
    { id: "CUST-102", name: "Bullet Pandi", email: "bullet@example.com", subscription: "Silver", invoices: 1, status: "Inactive" },
    { id: "CUST-103", name: "Kaipulla", email: "kaipulla@example.com", subscription: "Platinum", invoices: 5, status: "Active" },
    { id: "CUST-104", name: "Alert Aarumugam", email: "alert@example.com", subscription: "Gold", invoices: 2, status: "Inactive" },
  ]);

  const columns = ["ID", "Name", "Email", "Subscription", "Invoices", "Status", "Actions"];

  const handleUpdate = (updatedRow) => {
    setCustomers((prev) => prev.map((c) => (c.id === updatedRow.id ? updatedRow : c)));
  };

  const handleDelete = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex-1 p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <MyButton onClick={() => console.log("Add new customer")}>
          Add Customer
        </MyButton>
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <TableHeader columns={columns} />
          <tbody>
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
                          onClick: () =>
                            handleUpdate({ ...customer, status: "Active" }),
                        },
                        { type: "separator" },
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
