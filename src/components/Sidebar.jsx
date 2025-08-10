import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="w-60 h-screen fixed bg-sugarPink text-white flex flex-col justify-between p-6">
      <div>
        <h1 className="text-2xl font-bold mb-10">Sugar Admin</h1>
        <nav className="space-y-4">
          <Link to="/dashboard" className="block hover:text-sugarBrown">Dashboard</Link>
          <Link to="/products" className="block hover:text-sugarBrown">Products</Link>
          <Link to="/orders" className="block hover:text-sugarBrown">Orders</Link>
        </nav>
      </div>
      <button onClick={handleLogout} className="mt-10 text-left hover:text-sugarBrown">
        Logout
      </button>
    </div>
  )
}
