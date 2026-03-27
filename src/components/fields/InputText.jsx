function InputText({ data_field, format_field, handleChange, is_new }) {
  return (
    <input
      className={`form-control ${format_field.required && !data_field ? "is-invalid" : ""}`}
      disabled={format_field.disabled || false}
      id={format_field.name}
      minLength={format_field.minLength}
      maxLength={format_field.maxLength}
      name={format_field.name}
      onChange={handleChange}
      pattern={format_field.pattern}
      readOnly={format_field.read_only || (format_field.primary_key && !is_new)}
      required={format_field.required}
      size={format_field.size}
      type={format_field.type}
      value={data_field || ""}
    />
  );
}

export default InputText;
