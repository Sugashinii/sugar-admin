// src/pages/AddCategory.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

const STORAGE_KEY = "sugar_categories"
const PLACEHOLDER = "/mnt/data/Screenshot 2025-11-20 133906.png"

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

export default function AddCategory() {
  const [name, setName] = useState("")
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    setFile(f)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      toast({ title: "Name required", description: "Please enter a category name.", className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg" })
      return
    }

    let imgData = PLACEHOLDER
    if (file) {
      try {
        imgData = await readFileAsDataURL(file)
      } catch {
        imgData = PLACEHOLDER
      }
    }

    const existing = getStoredCategories()
    const newCategory = {
      id: Date.now(),
      name: name.trim(),
      img: imgData,
    }
    const updated = [newCategory, ...existing]
    saveStoredCategories(updated)

    toast({ title: "Category created", description: `Created ${name}`, className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg" })
    navigate("/categories")
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Create Category</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow">
        <label className="block mb-3">
          <span className="text-sm font-medium">Image</span>
          <div className="mt-2 flex items-center gap-4">
            <div className="w-24 h-24 rounded border overflow-hidden">
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <img src={PLACEHOLDER} alt="placeholder" className="w-full h-full object-cover" />
              )}
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
            placeholder="e.g. Eye"
          />
        </label>

        <div className="flex gap-3">
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">Create</button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
