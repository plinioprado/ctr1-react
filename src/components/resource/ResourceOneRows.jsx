import ResourceOneCell from "./ResourceOneCell";

function ResourceOneRows({
  data,
  data_rows_name,
  format_rows,
  format_options,
  is_new,
  onDataChange,
}) {
  const onDataRowsChange = (e, val, row_index) => {
    const dataRows = data[data_rows_name];
    const dataRow = dataRows[row_index];
    const name = e.target.name;
    const value = val !== undefined ? val : e.target.value;
    const newRow = {
      ...dataRow,
      [name]: value,
    };
    const newRows = dataRows.map((r, i) => (i === row_index ? newRow : r));
    const newE = {
      target: {
        name: data_rows_name,
        value: newRows,
      },
    };
    onDataChange(newE);
  };
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
      {data_rows.map((data_row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {format_columns_data.map((format_field) => (
            <ResourceOneCell
              key={format_field.name}
              format_field={format_field}
              format_options={format_options}
              data={data_row}
              onDataChange={(e, val) => onDataRowsChange(e, val, rowIndex)}
              is_new={is_new}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ResourceOneRows;
