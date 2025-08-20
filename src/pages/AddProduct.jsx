import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    rating: "",
    status: "Active",
    image: "",
  });

  const categories = [ "Cleanser","Toner","Serum", "Moisturizer", "Sunscreen" ];
  const quantities = ["10", "20", "50", "100", "200"];
  const ratings = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/products", { state: { newProduct: formData } });
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-4 max-w-2xl"
      >

        <div>
          <label className="block text-sm font-medium mb-2">Product Image</label>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-pink-500 transition">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <span className="text-gray-500">Click to upload or drag & drop</span>
                <span className="text-xs text-gray-400">(PNG, JPG, GIF)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <select
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Quantity</option>
            {quantities.map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

      
        <div>
          <label className="block text-sm font-medium">Star Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Rating</option>
            {ratings.map((star, index) => (
              <option key={index} value={star}>
                {star}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
