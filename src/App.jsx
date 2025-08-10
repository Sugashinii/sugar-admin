import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import AddProduct from './pages/AddProduct'
import Sidebar from './components/Sidebar'
import { isLoggedIn } from './utils/auth'

export default function App() {
  const location = useLocation()
  const showSidebar = isLoggedIn() && location.pathname !== "/"

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <div className={showSidebar ? "ml-60 p-4 w-full" : "w-full"}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}
<div className="text-3xl font-bold underline bg-green-300 p-4">
  Tailwind is finally working, honey! 🎉
</div>

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/" />
}
