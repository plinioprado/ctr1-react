function FieldText({ data_field, format_field, handleChange }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      {format_field.label !== null && <label>{format_field.label}</label>}
      <input
        type={format_field.type}
        className="form-control"
        name={format_field.name}
        onChange={handleChange}
        readOnly={format_field.readOnly || format_field.primary}
        value={data_field}
        size={format_field.size}
        minLength={format_field.min_length}
        maxLength={format_field.max_length}
        pattern={format_field.pattern}
        required={format_field.required}
      />
    </div>
  );
}

export default FieldText;
