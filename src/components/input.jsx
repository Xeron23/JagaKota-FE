const Input = ({
  label,
  name,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="lock text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        value={value}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border bg-[#F7EEDF] border-[#F7EEDF] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F7EEDF]"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
export default Input;
