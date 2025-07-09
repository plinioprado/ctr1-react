function InputSelect({ data_field, format_field, handleChange }) {
  return (
    <select
      className="form-select"
      id={format_field.name}
      name={format_field.name}
      onChange={handleChange}
      readOnly={format_field.readOnly}
      value={data_field}
    >
      {format_field.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default InputSelect;
