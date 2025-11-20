// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Login from "./pages/Login.jsx"
import ResetPassword from "./pages/ResetPassword.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Products from "./pages/Products.jsx"
import Orders from "./pages/Orders.jsx"
import AddProduct from "./pages/AddProduct.jsx"
import Customers from "./pages/Customers.jsx"
import Settings from "./pages/Settings.jsx"
import AddOrder from "./pages/AddOrder.jsx"
import Categories from "./pages/Categories.jsx"

import Sidebar from "./components/Sidebar.jsx"
import Navbar from "./components/Navbar.jsx"

import { isLoggedIn } from "./utils/auth.js"

export default function App() {
  const location = useLocation()
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  useEffect(() => {
    const checkAuth = () => setLoggedIn(isLoggedIn())
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  const authPaths = ["/", "/reset-password"]
  const showSidebar = loggedIn && !authPaths.includes(location.pathname)

  const makeTitle = (path) => {
    if (!path || path === "/") return "Dashboard"
    const name = path.replace("/", "")
    return name.replace(/-/g, " ").replace(/\b\w/, (c) => c.toUpperCase())
  }

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <div className={showSidebar ? "pl-64 flex-1 min-h-screen bg-gray-50" : "w-full"}>
        {showSidebar && <Navbar title={makeTitle(location.pathname)} />}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Login onLogin={() => setLoggedIn(true)} />} />
            <Route path="/reset-password" element={<ResetPassword />} />

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
              path="/products/add"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Categories />
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
              path="/orders/add"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <AddOrder />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customers"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Customers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers/add"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Customers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to={loggedIn ? "/dashboard" : "/"} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/" replace />
}
