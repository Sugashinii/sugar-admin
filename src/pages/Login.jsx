import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../utils/auth"
import { useToast } from "@/hooks/use-toast"

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = "admin"
    const pass = "1234"

    if (username === name && password === pass) {
      login("fake-token")
      onLogin?.()

      toast({
        title: "Login Successful 🎉",
        description: "Welcome back, Sugar Admin!",
        className: "bg-pink-500 text-white border-0 rounded-lg shadow-lg",
      })

      navigate("/dashboard")
    } else {
      setError("Invalid username or password ❌")

      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        className: "bg-black text-pink-200 border-0 rounded-lg shadow-lg",
      })
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
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
          className="w-full mb-2 p-2 border rounded"
        />

        {/* 🌸 Forgot Password Link */}
        <p
          onClick={() => navigate("/reset-password")}
          className="text-sm text-pink-600 cursor-pointer hover:underline mb-6 text-right"
        >
          Forgot Password?
        </p>

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
