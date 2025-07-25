import { useState } from "react";

function InputAmount({ data_field, format_field, handleChange }) {
  const formatAmt = (num) => {
    const text = Number(num).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return text;
  };

  const unformatAmt = (txt) => {
    const val = txt.replace(/,/g, "");
    return val === "0.00" ? "" : val;
  };

  const [amount, setAmount] = useState(formatAmt(data_field / 100));

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(formatAmt(val));
    handleChange(e, val * 100);
  };

  const handleCopy = (e) => {
    e.preventDefault();
    e.clipboardData.setData("text/plain", e.target.value);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const cleaned = text.replace(/[^0-9.]/g, "").replace(",", "");
    setAmount(cleaned);
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
      e.key === "End" ||
      (e.ctrlKey && e.key.toLowerCase() === "c") ||
      ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") ||
      (e.ctrlKey && e.key.toLowerCase() === "v") ||
      ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v")
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
    <input
      className="form-control"
      id={format_field.name}
      name={format_field.name}
      onBlur={handleAmountChange}
      onChange={(e) => setAmount(e.target.value)}
      onCopy={handleCopy}
      onFocus={(e) => {
        setAmount(unformatAmt(e.target.value));
      }}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      readOnly={format_field.readOnly}
      style={{ textAlign: "right" }}
      value={amount}
    />
  );
}

export default InputAmount;
