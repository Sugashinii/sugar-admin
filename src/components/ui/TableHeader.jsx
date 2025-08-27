import React from "react";

export default function TableHeader({ columns }) {
  return (
    <thead className="bg-gray-100">
      <tr>
        {columns.map((col, index) => (
          <th
            key={index}
            className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
