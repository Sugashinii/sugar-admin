// src/pages/Products.js
import React from "react";
import { Plus } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Japanese cherry blossom body butter",
      category: "Skin care",
      sku: "SJ-4961",
      quantity: "51/100",
      cost: "$24.00",
      price: "$35.00",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a5c9bfb5?w=100",
    },
    {
      id: 2,
      name: "Ultra shea body butter",
      category: "Skin care",
      sku: "SU-3206",
      quantity: "93/100",
      cost: "$24.00",
      price: "$35.00",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1596464716127-9e6a8b4e6d87?w=100",
    },
  ];

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-1/3 p-2 border rounded-lg"
        />
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-lg">Active</button>
          <button className="px-3 py-1 border rounded-lg">Category</button>
          <button className="px-3 py-1 border rounded-lg">Quantity</button>
          <button className="px-3 py-1 border rounded-lg">Price</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3"><input type="checkbox" /></th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {p.name}
                </td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.sku}</td>
                <td className="p-3">{p.quantity}</td>
                <td className="p-3">{p.cost}</td>
                <td className="p-3">{p.price}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
