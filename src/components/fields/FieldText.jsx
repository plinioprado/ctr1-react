import InputText from "./InputText";

function FieldText({ data_field, format_field, handleChange, is_new }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      {format_field.label !== null && (
        <label htmlFor={format_field.name}>{format_field.label}</label>
      )}
      <InputText
        data_field={data_field}
        format_field={format_field}
        handleChange={handleChange}
        is_new={is_new}
      />
    </div>
  );
}

export default FieldText;
