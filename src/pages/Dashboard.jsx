export default function Dashboard() {
  return (
    <div className="ml-60 p-10 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl mt-2 text-pink-600">₹10,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl mt-2 text-pink-600">1,500</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold">Customers</h3>
          <p className="text-2xl mt-2 text-pink-600">320</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-2xl mt-2 text-pink-600">100</p>
        </div>
      </div>
    </div>
  )
}
