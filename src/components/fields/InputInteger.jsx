import { useState } from "react";

function InputInteger({ data_field, format_field, handleChange, is_new }) {
  const unformatInteger = (txt) => {
    const val = txt.replace(/,/g, "");
    return val === "0" ? "" : val;
  };

  const [integer, setInteger] = useState(data_field);

  const handleIntegerChange = (e) => {
    const val = parseInt(e.target.value === "" ? 0 : e.target.value);
    setInteger(val);
    handleChange(e, val);
  };

  const handleKeyDown = (e) => {
    // Allow control/navigation keys
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Tab" ||
      e.key === "Home" ||
      e.key === "End"
    ) {
      return;
    }

    // Allow only digits and dot
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      return;
    }
  };

  return (
    <input
      className="form-control"
      id={format_field.name}
      name={format_field.name}
      onBlur={handleIntegerChange}
      onChange={(e) => setInteger(e.target.value)}
      onFocus={(e) => {
        setInteger(unformatInteger(e.target.value));
      }}
      onKeyDown={handleKeyDown}
      readOnly={format_field.read_only || (format_field.primary_key && !is_new)}
      style={{ textAlign: "right" }}
      value={integer}
    />
  );
}

export default InputInteger;
