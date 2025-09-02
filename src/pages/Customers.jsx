import React, { useState } from "react";
import TableHeader from "../components/ui/TableHeader";
import CustomerRow from "../components/ui/CustomerRow";
import MyButton from "../components/ui/MyButton";
import ConfirmDialog from "../components/ui/ConfirmDialog";

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: "CUST-101", name: "Body Soda", email: "body@example.com", subscription: "Gold", invoices: 3, status: "Active" },
    { id: "CUST-102", name: "Bullet Pandi", email: "bullet@example.com", subscription: "Silver", invoices: 1, status: "Inactive" },
    { id: "CUST-103", name: "Kaipulla", email: "kaipulla@example.com", subscription: "Platinum", invoices: 5, status: "Active" },
    { id: "CUST-104", name: "Alert Aarumugam", email: "alert@example.com", subscription: "Gold", invoices: 2, status: "Inactive" },
  ]);

  const [editingCustomer, setEditingCustomer] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleSave = () => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === editingCustomer.id ? editingCustomer : c))
    );
    setEditingCustomer(null);
  };

  const handleDelete = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setConfirmDelete(null);
  };

  const columns = ["ID", "Name", "Email", "Subscription", "Invoices", "Status", "Actions"];

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <MyButton onClick={() => console.log("Add new customer")}>
          Add Customer
        </MyButton>
      </div>

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
                <CustomerRow
                  key={customer.id}
                  row={customer}
                  editingCustomer={editingCustomer}
                  setEditingCustomer={setEditingCustomer}
                  setConfirmDelete={setConfirmDelete}
                  handleSave={handleSave}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => handleDelete(confirmDelete)}
      />
    </div>
  );
};

export default Customers;
