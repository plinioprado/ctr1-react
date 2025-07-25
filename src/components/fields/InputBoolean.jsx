function InputBoolean({ data_field, format_field, handleChange }) {
  const onChange = (e) => handleChange(e, e.target.value === "true");

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label htmlFor={format_field.name}>{format_field.label}</label>
      <select
        className="form-select"
        disabled={format_field.primary}
        id={format_field.name}
        name={format_field.name}
        onChange={onChange}
        value={data_field}
        readOnly={format_field.readOnly}
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  );
}

export default InputBoolean;
