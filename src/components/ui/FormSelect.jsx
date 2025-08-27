export default function FormSelect({ label, name, value, options, onChange, required }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border rounded-lg"
      >
        <option value="">Select {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
