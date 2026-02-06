import InputText from "./InputText";

function FieldText({ data_field, format_field, handleChange, is_new }) {
  const divClass = `col-md-${format_field.md}${data_field === null ? " invisible" : ""}`;

  return (
    !(format_field.display && format_field.display === false) && (
      <div className={divClass} key={format_field.name}>
        {format_field.label !== null && (
          <label htmlFor={format_field.name}>{format_field.label}</label>
        )}
        <InputText
          data_field={data_field}
          format_field={format_field}
          handleChange={handleChange}
          is_new={is_new}
          disabled={format_field.disabled}
        />
      </div>
    )
  );
}

export default FieldText;
