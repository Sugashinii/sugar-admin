export default function MyButton({ children, onClick, type="button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
    >
      {children}
    </button>
  );
}
