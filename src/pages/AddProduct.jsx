// src/pages/AddProduct.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../components/ui/MyButton";

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingProduct = location.state?.product || null;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    imageFile: null,
    imagePreview: "",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        category: editingProduct.category,
        quantity: editingProduct.quantity,
        price: editingProduct.price,
        imageFile: null,
        imagePreview: editingProduct.image || "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If you want, you can convert image to base64 or upload to server here
    const newProduct = {
      ...formData,
      image: formData.imagePreview,
    };

    navigate("/products", { state: { newProduct } });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-pink-500">
            {formData.imagePreview ? (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="max-h-40 mb-2 rounded"
              />
            ) : (
              <p className="text-gray-400">Click to select an image</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <MyButton type="button" onClick={() => navigate("/products")}>
            Cancel
          </MyButton>
          <MyButton type="submit">
            {editingProduct ? "Update Product" : "Add Product"}
          </MyButton>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
