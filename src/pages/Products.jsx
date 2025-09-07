// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import StatusBadge from "../components/ui/StatusBadge";
import MyButton from "../components/ui/MyButton";
import DataTable from "../components/ui/DataTable";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (location.state?.newProduct) {
      setProducts((prev) => [
        ...prev,
        { id: prev.length + 1, ...location.state.newProduct },
      ]);
      navigate("/products", { replace: true });
    }
  }, [location.state, navigate]);

  const columns = ["Product", "Category", "Quantity", "Price", "Status", "Actions"];

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <MyButton onClick={() => navigate("/add-product")}>
          <Plus className="w-4 h-4 inline-block mr-2" />
          Add New Product
        </MyButton>
      </div>

      {/* Products Table */}
      <DataTable columns={columns}>
        {products.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="p-6 text-center text-gray-500">
              No products yet. Click <b>Add New Product</b> to create one.
            </td>
          </tr>
        ) : (
          products.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="p-4 flex items-center gap-2">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {p.name}
              </td>
              <td className="p-4">{p.category}</td>
              <td className="p-4">{p.quantity}</td>
              <td className="p-4">{p.price}</td>
              <td className="p-4">
                <StatusBadge status={p.status} />
              </td>
              <td className="p-4 text-right">
                <button className="text-blue-600 hover:underline">Edit</button>
              </td>
            </tr>
          ))
        )}
      </DataTable>
    </div>
  );
};

export default Products;
