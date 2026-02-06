import InputPercentage from "./InputPercentage";

function FieldPercentage({ data_field, format_field, handleChange }) {
  const divClass = `col-md-${format_field.md}${data_field === null ? " invisible" : ""}`;

  return (
    <div className={divClass} key={format_field.name}>
      <label htmlFor={format_field.name}>{format_field.label}</label>
      <div className="input-group">
        <InputPercentage
          data_field={data_field}
          format_field={format_field}
          handleChange={handleChange}
        />
        <span className="input-group-text">%</span>
      </div>
    </div>
  );
}

export default FieldPercentage;
