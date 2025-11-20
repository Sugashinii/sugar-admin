// src/pages/Categories.jsx
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MoreVertical } from "lucide-react"
import ReusableDropdown from "../components/ui/ReusableDropdown"

const STORAGE_KEY = "sugar_categories"
const PLACEHOLDER = "/mnt/data/Screenshot 2025-11-20 140315.png"

function getStoredCategories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveStoredCategories(categories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
}

const defaultCategories = [
  { id: 1, name: "Eye", img: PLACEHOLDER },
  { id: 2, name: "Lips", img: PLACEHOLDER },
  { id: 3, name: "Hair", img: PLACEHOLDER },
]

export default function Categories() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const stored = getStoredCategories()
    if (stored && Array.isArray(stored) && stored.length) {
      setCategories(stored)
    } else {
      setCategories(defaultCategories)
      saveStoredCategories(defaultCategories)
    }
  }, [])

  const handleDelete = (id) => {
    const updated = categories.filter((c) => c.id !== id)
    setCategories(updated)
    saveStoredCategories(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div>
          <button
            onClick={() => navigate("/categories/add")}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
          >
            Create Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
            <div className="w-20 h-20 rounded-md border overflow-hidden">
              <img src={cat.img || PLACEHOLDER} alt={cat.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{cat.name}</h3>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/categories/edit/${cat.id}`}
                    className="text-sm px-3 py-1 border rounded text-pink-600 hover:bg-pink-50"
                  >
                    Edit
                  </Link>

                  <ReusableDropdown
                    trigger={
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical />
                      </button>
                    }
                    items={[
                      {
                        label: "Delete Category",
                        danger: true,
                        confirm: {
                          title: "Delete this category?",
                          description: "This will permanently remove the category.",
                          confirmLabel: "Delete",
                          confirmAction: () => handleDelete(cat.id),
                        },
                      },
                    ]}
                  />
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-2">ID: {cat.id}</p>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="mt-8 text-center text-gray-500">No categories yet. Create your first category.</div>
      )}
    </div>
  )
}
