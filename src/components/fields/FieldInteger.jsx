function FielInteger({ data_field, format_field, handleChange }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label>{format_field.label}</label>
      <input
        type={format_field.type}
        className="form-control"
        name={format_field.name}
        value={data_field}
        onChange={handleChange}
        disabled={format_field.primary}
        style={{ textAlign: "right" }}
      />
    </div>
  );
}

export default FielInteger;
