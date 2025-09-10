import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

const AddOrder = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [orderItems, setOrderItems] = useState([{ name: "", quantity: 1, price: 0 }]);

  const products = [
    { name: "Lipstick", price: 250 },
    { name: "Eyeliner", price: 150 },
    { name: "Face Wash", price: 300 },
    { name: "Moisturizer", price: 500 },
  ];

  const handleProductChange = (index, field, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index][field] = value;
    if (field === "name") {
      const product = products.find((p) => p.name === value);
      updatedItems[index].price = product ? product.price : 0;
    }
    setOrderItems(updatedItems);
  };

  const handleAddProduct = () => {
    setOrderItems([...orderItems, { name: "", quantity: 1, price: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const nextId =
      existingOrders.length > 0
        ? "ORD-" + (parseInt(existingOrders[existingOrders.length - 1].id.split("-")[1]) + 1)
        : "ORD-101";

    const newOrder = {
      id: nextId,
      customerName,
      orderItems,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    navigate("/orders");
  };

  return (
    <div className="min-h-[80vh] max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New Order</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2 text-gray-700">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Products</label>
          {orderItems.map((item, index) => (
            <div key={index} className="flex gap-3 mb-3 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-start bg-white border-gray-300"
                  >
                    {item.name || "Select product"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[200px] border rounded-md shadow-md bg-white">
                  <Command>
                    <CommandInput placeholder="Search products..." />
                    <CommandList>
                      <CommandEmpty>No products found.</CommandEmpty>
                      <CommandGroup>
                        {products.map((product) => (
                          <CommandItem
                            key={product.name}
                            onSelect={() => handleProductChange(index, "name", product.name)}
                          >
                            {product.name} — ₹{product.price}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleProductChange(index, "quantity", parseInt(e.target.value))}
                className="w-16 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <input
                type="text"
                value={item.price}
                readOnly
                className="w-24 border border-gray-300 rounded-md px-2 py-1 bg-gray-100"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProduct}
            className="text-pink-600 text-sm hover:underline"
          >
            + Add Another Product
          </button>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            onClick={() => setOrderItems([{ name: "", quantity: 1, price: 0 }])}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
