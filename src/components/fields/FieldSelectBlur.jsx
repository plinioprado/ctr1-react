import { useState } from "react";

function FieldSelectBlur({ data_field, format_field, handleFilterChange }) {
  const [value, setValue] = useState(data_field);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      {format_field.label !== null && (
        <label htmlFor={format_field.name}>{format_field.label}</label>
      )}
      <select
        className="form-select"
        id={format_field.name}
        name={format_field.name}
        onChange={onChange}
        onBlur={() => handleFilterChange(format_field.name, value)}
        value={data_field}
      >
        {format_field &&
          format_field.options &&
          Array.isArray(format_field.options) &&
          format_field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {/* <input
        className="form-control" - ok
        id={format_field.name} - ok
        minLength={format_field.minlength} - ok
        maxLength={format_field.maxlength} - ok
        name={format_field.name} - ok
        onChange={onChange} - ok
        onBlur={() => handleFilterChange(format_field.name, value)}
        pattern={format_field.pattern}
        readOnly={
          format_field.read_only ||
          (format_field.primary_key && value !== "new")
        }
        type={format_field.type}
        value={value}
      /> */}
    </div>
  );
}

export default FieldSelectBlur;
