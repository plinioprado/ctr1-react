import FieldDate from "./FieldDate";
import FieldSelect from "./FieldSelect";
import FieldText from "./FieldText";

function Field({ data_field, format_field, handleChange }) {
  return (
    <>
      {format_field.type === "select" ? (
        <FieldSelect
          data_field={data_field}
          format_field={format_field}
          handleChange={handleChange}
        />
      ) : format_field.type === "date" ? (
        <FieldDate
          data_field={data_field}
          format_field={format_field}
          handleChange={handleChange}
        />
      ) : (
        <FieldText
          data_field={data_field}
          format_field={format_field}
          handleChange={handleChange}
        />
      )}
    </>
  );
}

export default Field;
