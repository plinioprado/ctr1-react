import { useState } from "react";

function FieldTextBlur({ data_field, format_field, handleFilterChange }) {
  const [value, setValue] = useState(data_field);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      {format_field.label !== null && (
        <label htmlFor={format_field.name}>{format_field.label}</label>
      )}
      <input
        className="form-control"
        id={format_field.name}
        minLength={format_field.minlength}
        maxLength={format_field.maxlength}
        name={format_field.name}
        onChange={onChange}
        onBlur={() => handleFilterChange(format_field.name, value)}
        pattern={format_field.pattern}
        readOnly={format_field.readOnly || format_field.primary}
        type={format_field.type}
        value={value}
      />
    </div>
  );
}

export default FieldTextBlur;
