function FieldSelect({
  data_field,
  data_type = null,
  format_field = {},
  format_options = {},
  handleChange,
}) {
  const getOptions = () => {
    if (!format_field || !format_field.options) return [];
    if (format_field.options === "data_type") {
      return format_options[data_type] || [];
    }
    if (Array.isArray(format_field.options)) return format_field.options;
    return format_options[format_field.name] || [];
  };

  const options = getOptions();

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      {format_field.label !== null && (
        <label htmlFor={format_field.name}>{format_field.label}</label>
      )}
      <select
        className="form-select"
        id={format_field.name}
        name={format_field.name}
        onChange={handleChange}
        disabled={format_field.disabled || false}
        value={data_field}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FieldSelect;
