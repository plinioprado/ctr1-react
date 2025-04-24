function FieldBoolean({ data_field, format_field, handleChange }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label>{format_field.label}</label>
      <select
        className="form-select"
        disabled={format_field.primary}
        name={format_field.name}
        onChange={handleChange}
        value={data_field}
      >
        <option value={true}>True</option>
        <option value={false}>False</option>
      </select>
    </div>
  );
}

export default FieldBoolean;
