import { Link, useNavigate } from "react-router-dom"
import { LogOut, LayoutDashboard, ShoppingCart, Package, Users, Settings } from "lucide-react"
import { logout } from "../utils/auth"

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="w-30 h-screen fixed left-0 top-0 bg-white border-r shadow-sm flex flex-col justify-between">
      
      <div>
        <h1 className="text-2xl font-bold text-pink-600 p-6">Sugar Admin</h1>
        <nav className="flex flex-col space-y-2 px-4">
          <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded-md hover:bg-pink-100">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/orders" className="flex items-center gap-2 p-2 rounded-md hover:bg-pink-100">
            <ShoppingCart size={18} /> Orders
          </Link>
          <Link to="/products" className="flex items-center gap-2 p-2 rounded-md hover:bg-pink-100">
            <Package size={18} /> Products
          </Link>
          <Link to="/customers" className="flex items-center gap-2 p-2 rounded-md hover:bg-pink-100">
            <Users size={18} /> Customers
          </Link>
          <Link to="/settings" className="flex items-center gap-2 p-2 rounded-md hover:bg-pink-100">
            <Settings size={18} /> Settings
          </Link>
        </nav>
      </div>

    
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 w-full"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  )
}
