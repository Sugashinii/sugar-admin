import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import FormSelect from "../components/ui/FormSelect";
import MyButton from "../components/ui/MyButton";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",

    status: "Active",
    image: "",
  });

  const categories = ["Cleanser","Toner","Serum","Moisturizer","Sunscreen"];
  const quantities = ["10","20","50","100","200"];
  

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

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4 max-w-2xl">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Product Image</label>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-pink-500 transition">
            {formData.image ? (
              <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            ) : (
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <span className="text-gray-500">Click to upload or drag & drop</span>
                <span className="text-xs text-gray-400">(PNG, JPG, GIF)</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>
        </div>

        <FormInput label="Product Name" name="name" value={formData.name} onChange={handleChange} required />
        <FormSelect label="Category" name="category" value={formData.category} options={categories} onChange={handleChange} required />
        <FormSelect label="Quantity" name="quantity" value={formData.quantity} options={quantities} onChange={handleChange} required />
        <FormInput label="Price" type="number" name="price" value={formData.price} onChange={handleChange} required />
       
        <FormSelect label="Status" name="status" value={formData.status} options={["Active","Inactive"]} onChange={handleChange} />

        <MyButton type="submit">Save Product</MyButton>
      </form>
    </div>
  );
};

export default AddProduct;
