import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const AddCustomer = ({ onAdd, onCancel, existingCustomers = [] }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", 
    avatar: "",
  })
  const [suggestedCustomer, setSuggestedCustomer] = useState(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const BASE_URL = (import.meta?.env?.VITE_BASE_URL || "https://api.escuelajs.co").replace(/\/+$/, "")

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (form.name.trim()) {
      const match = existingCustomers.find(
        (c) =>
          c.name?.toLowerCase().includes(form.name.toLowerCase()) ||
          c.address?.toLowerCase().includes(form.name.toLowerCase())
      )
      setSuggestedCustomer(match || null)
    } else {
      setSuggestedCustomer(null)
    }
  }, [form.name, existingCustomers])

  const validateUrl = (url) => {
    if (!url) return true 
    try {
      
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      toast({
        title: "Invalid Email ❌",
        description: "Please enter a valid email address.",
        className: "bg-red-500 text-white rounded-lg",
      })
      return false
    }

    if (!form.password || form.password.length < 8) {
      toast({
        title: "Weak Password 🔒",
        description: "Password must be at least 8 characters long.",
        className: "bg-red-500 text-white rounded-lg",
      })
      return false
    }

    if (!validateUrl(form.avatar)) {
      toast({
        title: "Invalid Avatar URL 🖼️",
        description: "Please enter a valid image URL or leave blank.",
        className: "bg-red-500 text-white rounded-lg",
      })
      return false
    }

    if (!form.role || typeof form.role !== "string") {
      toast({
        title: "Invalid Role",
        description: "Please select a role.",
        className: "bg-red-500 text-white rounded-lg",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)

    const apiBody = {
      email: form.email,
      name: form.name,
      password: form.password,
      role: form.role,
      avatar: form.avatar || "",
    }

    try {
      const res = await fetch(`${BASE_URL}/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiBody),
      })

      if (!res.ok) {
        const errText = await res.text().catch(() => "")
        throw new Error(`API Error: ${res.status} ${res.statusText} ${errText}`)
      }

      const createdUser = await res.json()

   
      const newCustomerForUI = {
        id: createdUser.id || `CUST-${Math.floor(Math.random() * 1000)}`,
        name: createdUser.name || form.name,
        email: createdUser.email || form.email,
        role: createdUser.role || form.role,
        avatar: createdUser.avatar || form.avatar || "",
        invoices: 0,
        ...createdUser,
      }

      toast({
        title: "Customer Created ✅",
        description: `${newCustomerForUI.name} created successfully.`,
        className: "bg-green-500 text-white rounded-lg",
      })

      onAdd(newCustomerForUI)
      onCancel()
    } catch (err) {
      console.error("Create user failed:", err)
      toast({
        title: "Create Failed ❌",
        description: err?.message || "Something went wrong while creating the user. Check console.",
        className: "bg-red-500 text-white rounded-lg",
      })
    } finally {
      setLoading(false)
      setForm((prev) => ({ ...prev, password: "" }))
    }
  }

  return (
    <div className="flex-1 p-6">
      <Card className="max-w-lg mx-auto shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
            </div>

            {suggestedCustomer && (
              <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-md">
                <p className="text-sm text-yellow-700">
                  Did you mean: <b>{suggestedCustomer.name}</b>, {suggestedCustomer.address}?
                </p>
                <div className="mt-2 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      onAdd(suggestedCustomer)
                      onCancel()
                    }}
                  >
                    Use This Customer
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="min 8 characters"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="customer">customer</option>
                <option value="admin">admin</option>
                <option value="manager">manager</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="avatar">Avatar (image URL)</Label>
              <Input
                id="avatar"
                name="avatar"
                type="text"
                value={form.avatar}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg (optional)"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button" onClick={onCancel} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddCustomer
