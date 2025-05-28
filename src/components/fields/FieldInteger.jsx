function FielInteger({ data_field, format_field, handleChange }) {
  const handleIntegerChange = (e) => {
    const val = e.target.value;
    handleChange(e, parseInt(val, 10));
  };

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label>{format_field.label}</label>
      <input
        type={format_field.type}
        className="form-control"
        name={format_field.name}
        value={data_field}
        onChange={handleIntegerChange}
        disabled={format_field.primary}
        style={{ textAlign: "right" }}
        readOnly={format_field.readOnly}
      />
    </div>
  );
}

export default FielInteger;
