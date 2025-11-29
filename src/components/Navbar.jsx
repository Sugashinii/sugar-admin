import Breadcrumbs from "./Breadcrumbs"

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm flex items-center justify-between px-6 py-3">
      <div>
        <div className="mt-1">
          <Breadcrumbs />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Hello, Sugar!</span>
      </div>
    </div>
  )
}
