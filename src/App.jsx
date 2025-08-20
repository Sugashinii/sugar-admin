// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

// Pages
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Products from "./pages/Products.jsx"
import Orders from "./pages/Orders.jsx"
import AddProduct from "./pages/AddProduct.jsx"

// Components
import Sidebar from "./components/Sidebar.jsx"
import Navbar from "./components/Navbar.jsx"

// Utils
import { isLoggedIn } from "./utils/auth.js"

export default function App() {
  const location = useLocation()
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  useEffect(() => {
    const checkAuth = () => setLoggedIn(isLoggedIn())
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  // Sidebar should not show on login page
  const showSidebar = loggedIn && location.pathname !== "/"

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <div className={showSidebar ? "pl-60 flex-1 min-h-screen bg-gray-50" : "w-full"}>
        {showSidebar && (
          <Navbar title={location.pathname.replace("/", "") || "Dashboard"} />
        )}
        <div className="p-6">
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Login onLogin={() => setLoggedIn(true)} />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-product"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/" />
}
