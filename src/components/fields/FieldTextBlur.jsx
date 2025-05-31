import { useState } from "react";

function FieldTextBlur({ data_field, format_field, handleFilterChange }) {
  const [value, setValue] = useState(data_field);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      {format_field.label !== null && <label>{format_field.label}</label>}
      <input
        type={format_field.type}
        className="form-control"
        name={format_field.name}
        onChange={onChange}
        onBlur={handleFilterChange}
        readOnly={format_field.readOnly || format_field.primary}
        value={value}
      />
    </div>
  );
}

export default FieldTextBlur;
