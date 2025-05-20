function FieldAmount({ data_field, format_field, handleChange }) {
  const handleAmountChange = (e) => {
    handleChange(e, e.target.value * 100);
  };

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label>{format_field.label}</label>
      <input
        className="form-control"
        name={format_field.name}
        onChange={handleAmountChange}
        readOnly={format_field.readOnly}
        style={{ textAlign: "right" }}
        value={(data_field / 100).toFixed(2)}
      />
    </div>
  );
}

export default FieldAmount;
