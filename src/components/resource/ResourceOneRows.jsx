import ResourceOneCell from "./ResourceOneCell";

function ResourceOneRows({
  format_rows,
  format_options,
  data,
  onDataChange,
  is_new,
}) {
  const data_rows = data[format_rows.name] || [];
  const format_columns = format_rows.columns || [];
  const format_columns_data = (format_rows.columns || []).map((col) => ({
    ...col,
    label: null,
  }));
  return (
    <div className={`col-md-${format_rows.md}`} key={format_rows.name}>
      <div className="row">
        {format_columns.map((format_column) => (
          <div
            className={`col-md-${format_column.md} fw-bold`}
            key={format_column.name}
          >
            {format_column.label}
          </div>
        ))}
      </div>
      {data_rows.map((data_row, row_index) => (
        <div className="row" key={row_index}>
          {format_columns_data.map((format_field) => (
            <ResourceOneCell
              key={format_field.name}
              format_field={format_field}
              format_options={format_options}
              data={data_row}
              onDataChange={onDataChange}
              is_new={is_new}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ResourceOneRows;
