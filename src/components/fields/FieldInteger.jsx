import InputInteger from "./InputInteger";

function FieldInteger({ data_field, format_field, handleChange, is_new }) {
  const handleIntegerChange = (e) => {
    const val = e.target.value;
    handleChange(e, parseInt(val, 10));
  };

  const divClass = `col-md-${format_field.md}${data_field === null ? " invisible" : ""}`;

  return (
    <div className={divClass} key={format_field.name}>
      {format_field.label !== null && (
        <label htmlFor={format_field.name}>{format_field.label}</label>
      )}
      <InputInteger
        data_field={data_field}
        format_field={format_field}
        handleChange={handleIntegerChange}
        is_new={is_new}
      />
    </div>
  );
}

export default FieldInteger;
