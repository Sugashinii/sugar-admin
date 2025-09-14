import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MyButton from "../components/ui/MyButton"
import { useToast } from "@/hooks/use-toast"

const AddProduct = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const editingProduct = location.state?.product || null
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    minQuantity: "", // ✅ NEW FIELD
    imageFile: null,
    imagePreview: "",
  })

  // Pre-fill form if editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        category: editingProduct.category,
        quantity: editingProduct.quantity,
        price: editingProduct.price,
        minQuantity: editingProduct.minQuantity || "", // ✅ Pre-fill if available
        imageFile: null,
        imagePreview: editingProduct.image || "",
      })
    }
  }, [editingProduct])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newProduct = {
      ...formData,
      image: formData.imagePreview,
    }

    // ✅ Normal success toast
    toast({
      title: editingProduct ? "Product Updated ✅" : "Product Added 🎉",
      description: editingProduct
        ? `${newProduct.name} has been updated successfully.`
        : `${newProduct.name} has been added successfully.`,
      className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg",
    })

    // ✅ Low stock warning
    if (parseInt(newProduct.quantity) <= parseInt(newProduct.minQuantity)) {
      toast({
        title: "Low Stock ⚠️",
        description: `${newProduct.name} is at or below minimum stock level.`,
        className: "bg-yellow-500 text-white border-0 rounded-lg shadow-lg",
      })
    }

    navigate("/products", { state: { newProduct } })
  }

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

        {/* ✅ Minimum Quantity */}
        <div>
          <label className="block mb-1 font-medium">Minimum Quantity</label>
          <input
            type="number"
            name="minQuantity"
            value={formData.minQuantity}
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
        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-pink-500 mb-4">
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
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
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
  )
}

export default AddProduct
