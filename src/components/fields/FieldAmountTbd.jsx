import InputAmount from "./InputAmount";
import InputText from "./InputText";

function FieldAmountTbd({ data_field, format_field, handleChange }) {
  const divClass = `col-md-${format_field.md}${data_field === null ? " invisible" : ""}`;

  return (
    <div className={divClass} key={format_field.name}>
      {format_field.label !== null && (
        <label htmlFor={format_field.name}>{format_field.label}</label>
      )}
      {data_field === "TBD" ? (
        <InputText
          data_field={data_field}
          format_field={{
            ...format_field,
            disabled: true,
          }}
        />
      ) : (
        <InputAmount
          data_field={data_field}
          format_field={format_field}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}

export default FieldAmountTbd;
