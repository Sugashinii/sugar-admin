"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

const products = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 200 },
  { id: 3, name: "Product C", price: 150 },
]

const AddOrder = () => {
  const [customerName, setCustomerName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [orderItems, setOrderItems] = useState([{ productId: "", quantity: 1 }])
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("Cash")
  const [suggestions, setSuggestions] = useState([])

  const { toast } = useToast()
  const navigate = useNavigate()

  const savedCustomers = JSON.parse(localStorage.getItem("customers")) || []

  // calculate total
  const totalAmount = orderItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === Number(item.productId))
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  const handleChange = (index, field, value) => {
    const newItems = [...orderItems]
    newItems[index][field] = value
    setOrderItems(newItems)
  }

  const handleAddItem = () => {
    setOrderItems([...orderItems, { productId: "", quantity: 1 }])
  }

  const handleRemoveItem = (index) => {
    const newItems = [...orderItems]
    newItems.splice(index, 1)
    setOrderItems(newItems)
  }

  // 🔹 Customer name input with suggestions
  const handleCustomerInput = (e) => {
    const value = e.target.value
    setCustomerName(value)

    if (value.length > 1) {
      const matches = savedCustomers.filter((c) =>
        c.name.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  // 🔹 Autofill when selecting a suggestion
  const handleSelectCustomer = (cust) => {
    setCustomerName(cust.name)
    setEmail(cust.email || "")
    setPhone(cust.phone || "")
    setAddress(cust.address || "")
    setSuggestions([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!customerName.trim()) {
      toast({
        title: "Missing Customer",
        description: "Please enter customer name.",
        className: "bg-red-500 text-white",
      })
      return
    }

    if (!orderItems.every((item) => item.productId)) {
      toast({
        title: "Missing Product",
        description: "Please select a product for all rows.",
        className: "bg-red-500 text-white",
      })
      return
    }

    if (totalAmount <= 0) {
      toast({
        title: "Invalid Order",
        description: "Order total must be greater than 0.",
        className: "bg-red-500 text-white",
      })
      return
    }

    setIsPaymentOpen(true)
  }

  const handleConfirmPayment = () => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000)}`,
      customerName,
      email,
      phone,
      address,
      orderItems: orderItems.map((item) => {
        const product = products.find((p) => p.id === Number(item.productId))
        return {
          ...item,
          productName: product?.name || "",
          price: product?.price || 0,
        }
      }),
      amount: totalAmount,
      paymentMethod,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    }

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || []
    storedOrders.push(newOrder)
    localStorage.setItem("orders", JSON.stringify(storedOrders))

    toast({
      title: "Order Created 🎉",
      description: `Order for ${customerName} has been placed successfully.`,
      className: "bg-green-500 text-white",
    })

    setIsPaymentOpen(false)
    navigate("/orders")
  }

  return (
    <div className="flex-1 p-6">
      <Card className="max-w-3xl mx-auto ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name */}
            <div className="space-y-2 relative">
              <Label htmlFor="customer">Customer Name</Label>
              <Input
                id="customer"
                type="text"
                value={customerName}
                onChange={handleCustomerInput}
                required
              />
              {suggestions.length > 0 && (
                <div className="absolute bg-white border rounded-lg shadow p-2 mt-1 z-10 w-full">
                  {suggestions.map((cust) => (
                    <div
                      key={cust.id}
                      onClick={() => handleSelectCustomer(cust)}
                      className="p-2 hover:bg-pink-50 cursor-pointer rounded"
                    >
                      Do you mean <b>{cust.name}</b> ({cust.address})
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auto-filled fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            {/* Product List */}
            <div className="space-y-4">
              <Label>Products</Label>
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <select
                    className="border p-2 rounded-md w-1/2"
                    value={item.productId}
                    onChange={(e) => handleChange(index, "productId", e.target.value)}
                  >
                    <option value="">Select Product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${p.price})
                      </option>
                    ))}
                  </select>
                  <Input
                    type="number"
                    min="1"
                    className="w-24"
                    value={item.quantity}
                    onChange={(e) => handleChange(index, "quantity", Number(e.target.value))}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveItem(index)}
                    disabled={orderItems.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={handleAddItem}>
                + Add Product
              </Button>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg font-semibold">Total Amount: ${totalAmount}</p>
            <div>
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Digital">Digital</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmPayment}>Confirm Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddOrder
