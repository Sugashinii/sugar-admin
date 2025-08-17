import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../utils/auth"

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // ✅ Hardcoded credentials
    const hardUser = "admin"
    const hardPass = "1234"

    if (username === hardUser && password === hardPass) {
      login("fake-token") // store token in localStorage
      onLogin?.()         // 👈 notify App.jsx that login happened
      navigate("/dashboard")
    } else {
      setError("Invalid username or password ❌")
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200 relative">
      {/* blurred background */}
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"></div>

      {/* login box */}
      <form 
        onSubmit={handleSubmit} 
        className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sugar Admin</h2>
        
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border rounded"
        />

        <button 
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}
