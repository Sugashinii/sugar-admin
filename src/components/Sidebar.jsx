import { Link, useNavigate, useLocation } from "react-router-dom"
import { LogOut, LayoutDashboard, ShoppingCart, Package, Users, Settings } from "lucide-react"
import { logout } from "../utils/auth"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const getLinkClasses = (path) => {
    const activeClasses = "bg-rose-100 text-rose-700"
    const inactiveClasses = "text-slate-700 hover:bg-rose-50 hover:text-rose-600"
    const baseClasses = "flex items-center gap-3 p-3 rounded-lg transition-colors duration-200"

    return `${baseClasses} ${location.pathname === path ? activeClasses : inactiveClasses}`
  }

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-white border-r shadow-lg flex flex-col justify-between p-4">
      
      <div>
        <h1 className="text-2xl font-bold text-rose-600 mb-8 px-2">Sugar Admin</h1>
        <nav className="flex flex-col space-y-2">
          <Link to="/dashboard" className={getLinkClasses("/dashboard")}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/orders" className={getLinkClasses("/orders")}>
            <ShoppingCart size={20} /> Orders
          </Link>
          <Link to="/products" className={getLinkClasses("/products")}>
            <Package size={20} /> Products
          </Link>
          <Link to="/customers" className={getLinkClasses("/customers")}>
            <Users size={20} /> Customers
          </Link>
          <Link to="/settings" className={getLinkClasses("/settings")}>
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </div>

      <div className="border-t pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 text-red-500 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  )
}
