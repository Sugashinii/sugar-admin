import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Login() {
  const navigate = useNavigate()

  // Already logged in? Redirect to dashboard
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/dashboard")
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true")
    navigate("/dashboard")
  }

  return (
    <div className="flex items-center justify-center h-screen bg-sugarCream">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl mb-4 font-bold text-sugarBrown">Sugar Cosmetics Admin</h1>
        <p className="mb-6 text-sm text-sugarBrown">Login to manage your store</p>
        <button
          className="bg-sugarPink hover:bg-sugarBrown text-white px-6 py-2 rounded transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}
