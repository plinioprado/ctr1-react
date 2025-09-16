import FieldText from "./FieldText";

function Field({ data_field, format_field, handleChange }) {
  return (
    <FieldText
      data_field={data_field}
      format_field={format_field}
      handleChange={handleChange}
    />
  );
}
export default Field;
