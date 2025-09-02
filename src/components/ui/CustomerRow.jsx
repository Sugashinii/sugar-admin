import React from "react";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./KebabMenu";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import MyButton from "./MyButton";

const CustomerRow = ({ row, editingCustomer, setEditingCustomer, setConfirmDelete, handleSave }) => {
  const isEditing = editingCustomer?.id === row.id;

  return (
    <tr className="border-b hover:bg-rose-50 transition-colors duration-200">
      <td className="px-4 py-3 text-sm text-slate-700">{row.id}</td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {isEditing ? (
          <FormInput
            value={editingCustomer.name}
            onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
          />
        ) : (
          row.name
        )}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {isEditing ? (
          <FormInput
            value={editingCustomer.email}
            onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
          />
        ) : (
          row.email
        )}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {isEditing ? (
          <FormSelect
            value={editingCustomer.subscription}
            options={["Gold", "Silver", "Platinum"]}
            onChange={(e) => setEditingCustomer({ ...editingCustomer, subscription: e.target.value })}
          />
        ) : (
          row.subscription
        )}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">{row.invoices}</td>

      <td className="px-4 py-3">
        {isEditing ? (
          <FormSelect
            value={editingCustomer.status}
            options={["Active", "Inactive"]}
            onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value })}
          />
        ) : (
          <StatusBadge status={row.status} />
        )}
      </td>

      <td className="px-4 py-3 text-right">
        {isEditing ? (
          <div className="flex gap-2 justify-end">
            <MyButton variant="secondary" onClick={() => setEditingCustomer(null)}>Cancel</MyButton>
            <MyButton onClick={handleSave}>Save</MyButton>
          </div>
        ) : (
          <ActionMenu
            onEdit={() => setEditingCustomer(row)}
            onDelete={() => setConfirmDelete(row.id)}
          />
        )}
      </td>
    </tr>
  );
};

export default CustomerRow;
