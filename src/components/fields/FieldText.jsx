function FieldText({ data_field, format_field, handleChange }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      {format_field.label !== null && (
        <label htmlFor={format_field.name}>{format_field.label}</label>
      )}
      <input
        className="form-control"
        id={format_field.name}
        minLength={format_field.min_length}
        maxLength={format_field.max_length}
        name={format_field.name}
        onChange={handleChange}
        pattern={format_field.pattern}
        readOnly={format_field.readOnly || format_field.primary}
        required={format_field.required}
        size={format_field.size}
        type={format_field.type}
        value={data_field}
      />
    </div>
  );
}

export default FieldText;
