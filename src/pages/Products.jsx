// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../components/ui/MyButton";
import DataTable from "../components/ui/DataTable";
import ReusableDropdown from "../components/ui/ReusableDropdown";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  // Load products from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  // Add new product if coming from AddProduct page
  useEffect(() => {
    if (location.state?.newProduct) {
      setProducts((prev) => {
        const updated = [
          ...prev,
          { id: prev.length + 1, ...location.state.newProduct },
        ];
        localStorage.setItem("products", JSON.stringify(updated));
        return updated;
      });
      navigate("/products", { replace: true });
    }
  }, [location.state, navigate]);

  // Delete product
  const handleDelete = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const columns = ["Product", "Category", "Quantity", "Price", "Actions"];

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
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <DataTable columns={columns}>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-6 text-center text-gray-500"
              >
                No products yet. Click <b>Add New Product</b> to create one.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr
                key={p.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 flex items-center gap-2">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  {p.name}
                </td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">{p.quantity}</td>
                <td className="p-4">{p.price}</td>
                <td className="p-4 text-right">
                  <ReusableDropdown
                    trigger={
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical />
                      </button>
                    }
                    items={[
                      {
                        label: "Edit Product",
                        onClick: () =>
                          navigate("/add-product", { state: { product: p } }),
                      },
                      {
                        label: "Delete Product",
                        danger: true,
                        confirm: {
                          title: "Delete this product?",
                          description:
                            "This will permanently remove the product.",
                          confirmLabel: "Delete",
                          confirmAction: () => handleDelete(p.id),
                        },
                      },
                    ]}
                  />
                </td>
              </tr>
            ))
          )}
        </DataTable>
      </div>
    </div>
  );
};

export default Products;
