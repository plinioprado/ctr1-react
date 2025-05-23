function FieldText({ data_field, format_field, handleChange }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label>{format_field.label}</label>
      <input
        type="date"
        className="form-control"
        name={format_field.name}
        onChange={handleChange}
        readOnly={format_field.readOnly || format_field.primary}
        min={format_field.min}
        max={format_field.max}
        value={data_field}
      />
    </div>
  );
}

export default FieldText;
