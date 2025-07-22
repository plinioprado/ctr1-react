import InputAmount from "./InputAmount";

function FieldAmount({ data_field, format_field, handleChange }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label htmlFor={format_field.name}>{format_field.label}</label>
      <InputAmount
        data_field={data_field}
        format_field={format_field}
        handleChange={handleChange}
      />
    </div>
  );
}

export default FieldAmount;
