export default function Navbar({ title = "Dashboard" }) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm flex items-center justify-between px-6 py-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Hello, Admin</span>
      
      </div>
    </div>
  )
}
