import InputSelect from "./InputSelect";

function FieldSelect({
  data_field,
  data_type = null,
  format_field = {},
  format_options = {},
  handleChange,
}) {
  const getOptions = () => {
    if (!format_field || !format_field.options) return [];
    if (
      typeof format_field.options === "string" &&
      format_options[format_field.options] !== undefined
    ) {
      return format_options[format_field.options];
    }
    if (format_field.options === "data_type") {
      return format_options[data_type] || [];
    }
    if (Array.isArray(format_field.options)) return format_field.options;
    return format_options[format_field.name] || [];
  };

  const options = getOptions();
  const divClass = `col-md-${format_field.md}${data_field === null ? " invisible" : ""}`;

  return (
    <div className={divClass} key={format_field.name}>
      {format_field.label !== null && (
        <label htmlFor={format_field.name}>{format_field.label}</label>
      )}
      <InputSelect
        data_field={data_field}
        format_field={format_field}
        handleChange={handleChange}
        options={options}
      />
    </div>
  );
}

export default FieldSelect;
