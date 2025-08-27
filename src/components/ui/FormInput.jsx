export default function FormInput({ label, type="text", name, value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border rounded-lg"
      />
    </div>
  );
}
