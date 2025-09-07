// src/components/ui/DataTable.jsx
import React from "react";

export default function DataTable({ columns, children }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="p-4 text-sm font-semibold text-gray-700"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

