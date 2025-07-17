function InputText({ data_field, format_field, handleChange, is_new }) {
  return (
    <input
      className="form-control"
      id={format_field.name}
      minLength={format_field.min_length}
      maxLength={format_field.max_length}
      name={format_field.name}
      onChange={handleChange}
      pattern={format_field.pattern}
      readOnly={format_field.read_only || (format_field.primary_key && !is_new)}
      required={format_field.required}
      size={format_field.size}
      type={format_field.type}
      value={data_field}
    />
  );
}

export default InputText;
