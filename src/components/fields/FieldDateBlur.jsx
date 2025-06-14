import { useState } from "react";

function FieldDateBlur({ data_field, format_field, handleFilterChange }) {
  const [value, setValue] = useState(data_field);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  console.log(1, format_field);

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label>{format_field.label}</label>
      <input
        type="date"
        className="form-control"
        name={format_field.name}
        onChange={onChange}
        onBlur={() => handleFilterChange(format_field.name, value)}
        readOnly={format_field.readOnly || format_field.primary}
        min={format_field.min}
        max={format_field.max}
        value={value}
      />
    </div>
  );
}

export default FieldDateBlur;
