import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MoreVertical } from "lucide-react"
import ReusableDropdown from "../components/ui/ReusableDropdown"
import { useToast } from "@/hooks/use-toast"

const STORAGE_KEY = "sugar_categories"
const PLACEHOLDER = "/mnt/data/Screenshot 2025-11-20 140315.png"

function getStoredCategories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveStoredCategories(categories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null) 
  const [name, setName] = useState("")
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const stored = getStoredCategories()
    if (stored && stored.length) {
      setCategories(stored)
    } else {
    const defaults = [
  { id: 1, name: "Eye", img: "/eye.jpeg" },
  { id: 2, name: "Lips", img: "/lip-copy.jpeg" },
  { id: 3, name: "Hair", img: "/hhair.jpeg" },
];

      setCategories(defaults)
      saveStoredCategories(defaults)
    }
  }, [])

  const openAddDialog = () => {
    setEditingId(null)
    setName("")
    setPreview(null)
    setFile(null)
    setDialogOpen(true)
  }

  const openEditDialog = (id) => {
    const cat = categories.find((c) => String(c.id) === String(id))
    if (!cat) return
    setEditingId(cat.id)
    setName(cat.name || "")
    setPreview(cat.img || PLACEHOLDER)
    setFile(null)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditingId(null)
    setName("")
    setPreview(null)
    setFile(null)
  }

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    setFile(f)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a category name.",
        className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg",
      })
      return
    }

    let imgData = preview || PLACEHOLDER
    if (file) {
      try {
        imgData = await readFileAsDataURL(file)
      } catch {
        imgData = preview || PLACEHOLDER
      }
    }

    if (editingId) {
      const updated = categories.map((c) =>
        String(c.id) === String(editingId) ? { ...c, name: name.trim(), img: imgData } : c
      )
      setCategories(updated)
      saveStoredCategories(updated)
      toast({
        title: "Saved",
        description: `Saved ${name}`,
        className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg",
      })
    } else {
      const existing = getStoredCategories()
      const newCategory = {
        id: Date.now(),
        name: name.trim(),
        img: imgData,
      }
      const updated = [newCategory, ...existing]
      setCategories(updated)
      saveStoredCategories(updated)
      toast({
        title: "Category created",
        description: `Created ${name}`,
        className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg",
      })
    }

    closeDialog()
  }

  const handleDelete = (id) => {
    const updated = categories.filter((c) => c.id !== id)
    setCategories(updated)
    saveStoredCategories(updated)
    toast({
      title: "Category Deleted",
      description: "Category removed.",
      className: "bg-black text-pink-200 border-0 rounded-lg shadow-lg",
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div>
          <button
            onClick={openAddDialog}
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
                  <button
                    onClick={() => openEditDialog(cat.id)}
                    className="text-sm px-3 py-1 border rounded text-pink-600 hover:bg-pink-50"
                  >
                    Edit
                  </button>

                  <ReusableDropdown
                    trigger={<button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical /></button>}
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

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeDialog}
          />
          <div className="relative z-10 w-[min(720px,95%)] bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Category" : "Create Category"}</h2>
            <form onSubmit={handleSave}>
              <label className="block mb-4">
                <span className="text-sm font-medium">Image</span>
                <div className="mt-2 flex items-center gap-4">
                  <div className="w-28 h-28 rounded border overflow-hidden">
                    <img src={preview || PLACEHOLDER} alt="preview" className="w-full h-full object-cover" />
                  </div>
                  <input type="file" accept="image/*" onChange={handleFile} />
                </div>
              </label>

              <label className="block mb-6">
                <span className="text-sm font-medium">Category Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="e.g. Lipsticks"
                />
              </label>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeDialog} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
                  {editingId ? "Save" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
