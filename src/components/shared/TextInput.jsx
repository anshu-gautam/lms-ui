function TextInput({
  label,
  type = "text",
  name,
  placeholder,
  onChange,
  className,
}) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-xl capitalize">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`border-2 border-gray-600 p-2 focus:outline-none ${className}`}
      />
    </div>
  );
}

export default TextInput;
