function InputSelect({
  data_field,
  format_field,
  handleChange,
  options = null,
}) {
  const select_options = options || format_field.options;
  return (
    <select
      className="form-select"
      disabled={format_field.disabled || false}
      id={format_field.name}
      name={format_field.name}
      onChange={handleChange}
      value={data_field}
    >
      {select_options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default InputSelect;
