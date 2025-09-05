function FieldDate({ data_field, format_field, handleChange, is_new }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label htmlFor={format_field.name}>{format_field.label}.</label>
      <input
        type="date"
        className="form-control"
        id={format_field.name}
        name={format_field.name}
        onChange={handleChange}
        readOnly={
          format_field.read_only || (format_field.primary_key && !is_new)
        }
        min={format_field.min}
        max={format_field.max}
        value={data_field}
      />
    </div>
  );
}

export default FieldDate;
