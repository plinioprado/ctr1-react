function ResourceOneRows({ format_rows, data, onDataChange, is_new }) {
  console.log(format_rows.columns);
  return (
    <div className={`col-md-${format_rows.md}`} key={format_rows.name}>
      <div className="row">
        {format_rows.columns &&
          format_rows.columns.map((format_column) => (
            <div
              className={`col-md-${format_column.md} fw-bold`}
              key={format_column.name}
            >
              {format_column.label}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ResourceOneRows;
