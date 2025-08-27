export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl mt-2 text-pink-600">{value}</p>
    </div>
  );
}
