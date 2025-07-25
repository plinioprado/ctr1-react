import InputInteger from "./InputInteger";

function FieldInteger({ data_field, format_field, handleChange, is_new }) {
  const handleIntegerChange = (e) => {
    const val = e.target.value;
    handleChange(e, parseInt(val, 10));
  };

  return (
    <InputInteger
      data_field={data_field}
      format_field={format_field}
      handleChange={handleIntegerChange}
      is_new={is_new}
    />
  );
}

export default FieldInteger;
