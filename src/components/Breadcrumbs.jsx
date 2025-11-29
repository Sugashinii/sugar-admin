
import { Link, useLocation } from "react-router-dom"

const defaultLabelMap = {
  dashboard: "Dashboard",
  products: "Products",
  orders: "Orders",
  customers: "Customers",
  settings: "Settings",
  categories: "Categories",
  add: "Add",
  edit: "Edit",

}

const isNumeric = (s) => /^\d+$/.test(s)

export default function Breadcrumbs({ labelMap = {}, separator = "›" }) {
  const location = useLocation()
  const map = { ...defaultLabelMap, ...labelMap }
  const pathname = location.pathname || "/"

  const originalSegments = pathname.split("/").filter(Boolean)


  const crumbs = []
  let accPath = ""
  for (const seg of originalSegments) {
    accPath += `/${seg}`
    if (isNumeric(seg)) {
    
      continue
    }
    crumbs.push({ seg, path: accPath })
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex items-center gap-2">
        <li>
          <Link to="/dashboard" className="text-rose-600 hover:underline">Home</Link>
        </li>

        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1
          const label = map[c.seg] ?? c.seg.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase())

          return (
            <li key={c.path} className="flex items-center">
              <span className="mx-2 text-gray-400">{separator}</span>
              {isLast ? (
                <span className="text-slate-700 font-medium">{label}</span>
              ) : (
                <Link to={c.path} className="text-rose-600 hover:underline">{label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
