export default function StatusBadge({ status }) {
  const base = "px-2 py-1 text-xs rounded";
  const active = "bg-green-100 text-green-700";
  const inactive = "bg-red-100 text-red-700";

  return (
    <span className={`${base} ${status === "Active" ? active : inactive}`}>
      {status}
    </span>
  );
}
