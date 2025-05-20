function FieldAmount({ data_field, format_field, handleChange }) {
  const handleAmountChange = (e) => {
    e.target.value = e.target.value * 100;
    handleChange(e);
  };

  console.log("FieldxxxAmount", data_field, data_field / 100);

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label>{format_field.label}</label>
      <input
        type={format_field.type}
        className="form-control"
        name={format_field.name}
        value={(data_field / 100).toFixed(2)}
        onChange={handleAmountChange}
        disabled={format_field.primary}
        style={{ textAlign: "right" }}
      />
    </div>
  );
}

export default FieldAmount;
