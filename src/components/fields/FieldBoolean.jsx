import InputBoolean from "./InputBoolean";

function FieldBoolean({ data_field, format_field, handleChange }) {
  return (
    <InputBoolean
      data_field={data_field}
      format_field={format_field}
      handleChange={handleChange}
    />
  );
}

export default FieldBoolean;
