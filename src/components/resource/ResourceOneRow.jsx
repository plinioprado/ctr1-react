import ResourceOneCell from "./ResourceOneCell";
import ResourceOneRows from "./ResourceOneRows";

function ResourceOne({ format_one_row, data, onDataChange, is_new }) {
  return (
    <div className="row">
      {format_one_row.map((format_field) =>
        format_field.type === "rows" ? (
          <ResourceOneRows
            key={format_field.name}
            format_rows={format_field}
            data={data}
            onDataChange={onDataChange}
            is_new={is_new}
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

export default ResourceOne;
