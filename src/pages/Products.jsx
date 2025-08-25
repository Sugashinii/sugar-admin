import React, { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

const Products = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [products, setProducts] = useState([])

  useEffect(() => {
    if (location.state?.newProduct) {
      setProducts((prev) => [
        ...prev,
        { id: prev.length + 1, ...location.state.newProduct },
      ])

      navigate("/products", { replace: true })
    }
  }, [location.state, navigate])

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => navigate("/add-product")}
          className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
             
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No products yet. Click <b>Add New Product</b> to create one.
                </td>
              </tr>
            ) : (
              products.map((p) => (
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
              
                  <td className="p-3">{p.quantity}</td>
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
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products
