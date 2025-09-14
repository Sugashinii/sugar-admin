"use client"

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
    phone: "",
    address: "",
  })

  const [suggestedCustomer, setSuggestedCustomer] = useState(null)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  
  useEffect(() => {
    if (form.name.trim()) {
      const match = existingCustomers.find(
        (c) =>
          c.name.toLowerCase().includes(form.name.toLowerCase()) ||
          c.address.toLowerCase().includes(form.name.toLowerCase())
      )
      setSuggestedCustomer(match || null)
    } else {
      setSuggestedCustomer(null)
    }
  }, [form.name, existingCustomers])

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

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(form.phone)) {
      toast({
        title: "Invalid Phone Number 📱",
        description: "Phone number must be exactly 10 digits.",
        className: "bg-red-500 text-white rounded-lg",
      })
      return false
    }

    if (!form.address.trim()) {
      toast({
        title: "Missing Address 🏠",
        description: "Please enter the customer’s address.",
        className: "bg-red-500 text-white rounded-lg",
      })
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const newCustomer = {
      id: `CUST-${Math.floor(Math.random() * 1000)}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      invoices: 0,
    }

    onAdd(newCustomer)
    onCancel()
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
              <Input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {suggestedCustomer && (
              <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-md">
                <p className="text-sm text-yellow-700">
                  Did you mean: <b>{suggestedCustomer.name}</b>,{" "}
                  {suggestedCustomer.address}?
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
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

  
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

          
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddCustomer
