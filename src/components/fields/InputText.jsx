function InputText({ data_field, format_field, handleChange }) {
  return (
    <input
      className="form-control"
      id={format_field.name}
      minLength={format_field.min_length}
      maxLength={format_field.max_length}
      name={format_field.name}
      onChange={handleChange}
      pattern={format_field.pattern}
      readOnly={format_field.read_only}
      required={format_field.required}
      size={format_field.size}
      type={format_field.type}
      value={data_field}
    />
  );
}

export default InputText;
