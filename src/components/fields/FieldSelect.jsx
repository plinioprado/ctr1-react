function FieldSelect({ data_field, format_field, handleChange }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label htmlFor={format_field.name}>{format_field.label}</label>
      <select
        className="form-select"
        id={format_field.name}
        name={format_field.name}
        onChange={handleChange}
        readOnly={format_field.read_only}
        value={data_field}
      >
        {format_field &&
          format_field.options &&
          Array.isArray(format_field.options) &&
          format_field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}

export default FieldSelect;
