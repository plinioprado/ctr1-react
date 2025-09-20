function ResourceGrid({
  data_rows,
  format_grid,
  route_url = "http://localhost:5173/resource/ctr/security/accounts",
}) {
  return (
    <div className="container grid">
      <ResourceGridHeader format_grid={format_grid} />
      {data_rows.map((data_row, index) => (
        <ResourceGridRow
          key={index}
          data_row={data_row}
          format_grid={format_grid}
          route_url={route_url}
        />
      ))}
    </div>
  );
}

function ResourceGridHeader({ format_grid }) {
  return (
    <div className="row grid-header">
      {format_grid.columns
        .filter((f) => f.display !== false)
        .map((column, index) => (
          <div
            key={index}
            className={`${column.md ? ` col-md-${column.md}` : "col"}`}
          >
            {column.label}
          </div>
        ))}
    </div>
  );
}

function ResourceGridRow({ data_row, format_grid, route_url }) {
  const primary_key_value_name = format_grid.columns.find(
    (col) => col.primary_key_value,
  )?.name;
  const primary_key_name =
    primary_key_value_name !== undefined
      ? primary_key_value_name
      : format_grid.columns.find((col) => col.primary_key)?.name;

  const primary_key_value =
    primary_key_name === undefined ? undefined : data_row[primary_key_name];

  return (
    <div className="row grid-data">
      {format_grid.columns
        .filter((f) => f.display !== false)
        .map((column, index) => (
          <ResourceGridCell
            key={index}
            cell_value={data_row[column.name]}
            cell_type={column.type}
            primary_key_value={
              column.primary_key == true ? primary_key_value : undefined
            }
            route_url={route_url}
            md={column.md}
          />
        ))}
    </div>
  );
}

function ResourceGridCell({
  cell_value,
  cell_type,
  primary_key_value,
  route_url,
  md,
}) {
  const formatAmount = (val) => {
    let text = "";
    if (val !== "" && val !== undefined) {
      text = (val / 100).toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      text = "";
    }
    return text;
  };
  const formatPercentage = (val) => {
    return `${(val * 100).toFixed(2)}%`;
  };

  const value =
    cell_type == "amount"
      ? formatAmount(cell_value)
      : cell_type == "percentage"
      ? formatPercentage(cell_value)
      : cell_value;

  const cell_class =
    cell_type == "integer"
      ? " integer"
      : cell_type == "amount"
      ? " amount"
      : cell_type == "percentage"
      ? " percentage"
      : "";
  const col = md ? `col-md-${md}` : "col";
  return (
    <div className={`${col}${cell_class}`}>
      {primary_key_value === undefined ? (
        value
      ) : (
        <a href={`${route_url}/${primary_key_value}`}>{primary_key_value}</a>
      )}
    </div>
  );
}

export default ResourceGrid;
