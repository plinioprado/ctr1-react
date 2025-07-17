function FielInteger({ data_field, format_field, handleChange, is_new }) {
  const handleIntegerChange = (e) => {
    const val = e.target.value;
    handleChange(e, parseInt(val, 10));
  };

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label htmlFor={format_field.name}>{format_field.label}</label>
      <input
        type={format_field.type}
        className="form-control"
        id={format_field.name}
        name={format_field.name}
        value={data_field}
        onChange={handleIntegerChange}
        disabled={format_field.primary}
        is_new={is_new}
        style={{ textAlign: "right" }}
        readOnly={format_field.readOnly}
      />
    </div>
  );
}

export default FielInteger;
