function ResourceOneRows({ format_rows, data, onDataChange, is_new }) {
  const data_rows = data[format_rows.name] || [];
  const format_columns = format_rows.columns || [];
  console.log(data_rows);
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
          {format_columns.map((format_column) => (
            <div
              className={`col-md-${format_column.md}`}
              key={format_column.name}
            >
              {data_row[format_column.name]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ResourceOneRows;
