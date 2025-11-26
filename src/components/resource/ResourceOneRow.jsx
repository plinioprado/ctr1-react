import ResourceOneCell from "./ResourceOneCell";
import ResourceOneRows from "./ResourceOneRows";

function ResourceOneRow({
  format_one_row,
  format_options,
  data,
  onDataChange,
  is_new,
}) {
  if (!format_one_row) throw new Error("missing format data");
  if (!Array.isArray(format_one_row)) throw new Error("invalid format data");
  return (
    <div className="row">
      {format_one_row &&
        format_one_row.map((format_field) =>
          format_field.type === "rows" ? (
            <ResourceOneRows
              data={data}
              data_rows_name={format_field.name}
              key={format_field.name}
              format_rows={format_field}
              format_options={format_options}
              is_new={is_new}
              onDataChange={onDataChange}
            />
          ) : (
            <ResourceOneCell
              key={format_field.name}
              format_field={format_field}
              data={data}
              onDataChange={onDataChange}
              is_new={is_new}
            />
          ),
        )}
    </div>
  );
}

export default ResourceOneRow;
