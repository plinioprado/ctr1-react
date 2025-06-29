function InputInteger({ data_field, format_field, handleChange }) {
  const handleIntegerChange = (e) => {
    const val = e.target.value;
    handleChange(e, parseInt(val, 10));
  };

  return (
    <input
      type={format_field.type}
      className="form-control"
      id={format_field.name}
      name={format_field.name}
      value={data_field}
      onChange={handleIntegerChange}
      disabled={format_field.primary}
      style={{ textAlign: "right" }}
      readOnly={format_field.readOnly}
    />
  );
}

export default InputInteger;
