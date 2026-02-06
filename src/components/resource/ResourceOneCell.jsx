import FieldAmount from "../fields/FieldAmount";
import FieldBlank from "../fields/FieldBlank";
import FieldBoolean from "../fields/FieldBoolean";
import FieldDate from "../fields/FieldDate";
import FieldInteger from "../fields/FieldInteger";
import FieldPercentage from "../fields/FieldPercentage";
import FieldSelect from "../fields/FieldSelect";
import FieldText from "../fields/FieldText";

function ResourceOneCell({
  format_field,
  format_options,
  data,
  onDataChange,
  is_new,
}) {
  return (
    <>
      {format_field.type &&
        (format_field.type === "blank" ? (
          <FieldBlank format_field={format_field} key={format_field.name} />
        ) : format_field.type === "amount" ? (
          <FieldAmount
            data_field={data[format_field.name]}
            format_field={format_field}
            handleChange={onDataChange}
            key={format_field.name}
          />
        ) : format_field.type === "boolean" ? (
          <FieldBoolean
            data_field={data[format_field.name]}
            format_field={format_field}
            handleChange={onDataChange}
            key={format_field.name}
          />
        ) : format_field.type === "date" ? (
          <FieldDate
            data_field={data[format_field.name]}
            format_field={format_field}
            handleChange={onDataChange}
            is_new={is_new}
            key={format_field.name}
          />
        ) : format_field.type === "integer" ? (
          <FieldInteger
            data_field={data[format_field.name]}
            format_field={format_field}
            handleChange={onDataChange}
            is_new={is_new}
            key={format_field.name}
          />
        ) : format_field.type === "percentage" ? (
          <FieldPercentage
            data_field={data[format_field.name]}
            format_field={format_field}
            handleChange={onDataChange}
            key={format_field.name}
          />
        ) : format_field.type === "select" ? (
          <FieldSelect
            data_field={data[format_field.name]}
            data_type={data.type}
            format_field={format_field}
            format_options={format_options}
            handleChange={onDataChange}
            key={format_field.name}
          />
        ) : (
          <FieldText
            data_field={data[format_field.name]}
            format_field={format_field}
            handleChange={onDataChange}
            is_new={is_new}
            key={format_field.name}
          />
        ))}
    </>
  );
}

export default ResourceOneCell;
