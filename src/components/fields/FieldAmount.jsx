import { useState } from "react";

function FieldAmount({ data_field, format_field, handleChange }) {
  const formatAmt = (num) => {
    const text = Number(num).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return text;
  };

  const unformatAmt = (txt) => {
    const val = txt.replace(/,/g, "");
    return val;
  };

  const [amount, setAmount] = useState(formatAmt(data_field / 100));

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(formatAmt(val));
    handleChange(e, val * 100);
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
    if (!/^[0-9.]$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    // Only one dot allowed
    if (e.key === "." && e.target.value.includes(".")) {
      e.preventDefault();
      return;
    }

    // Restrict digits before dot to 10
    const dotIndex = e.target.value.indexOf(".");
    if (
      e.key >= "0" &&
      e.key <= "9" &&
      ((dotIndex === -1 &&
        e.target.value.length >= 10 &&
        e.target.selectionStart > 9) || // no dot, max 10 digits
        (dotIndex !== -1 &&
          e.target.selectionStart <= dotIndex &&
          e.target.value.slice(0, dotIndex).length >= 10))
    ) {
      e.preventDefault();
      return;
    }

    // Restrict to only 2 digits after the dot
    if (
      dotIndex !== -1 &&
      e.target.selectionStart > dotIndex &&
      e.target.value.substring(dotIndex + 1).length >= 2 &&
      e.key >= "0" &&
      e.key <= "9"
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className={`col-md-${format_field.md}`} key={format_field.name}>
      <label>{format_field.label}</label>
      <input
        className="form-control"
        name={format_field.name}
        onBlur={handleAmountChange}
        onChange={(e) => setAmount(e.target.value)}
        onFocus={(e) => {
          setAmount(unformatAmt(e.target.value));
        }}
        onKeyDown={handleKeyDown}
        readOnly={format_field.readOnly}
        style={{ textAlign: "right" }}
        value={amount}
      />
    </div>
  );
}

export default FieldAmount;
