import InputPercentage from "./InputPercentage";

function FieldPercentage({ data_field, format_field, handleChange }) {
  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
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
