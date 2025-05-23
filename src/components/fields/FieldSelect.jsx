function FieldSelect({ data_field, format_field, handleChange }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label>{format_field.label}</label>
      <select
        className="form-select"
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
    </div>
  );
}

export default FieldSelect;
