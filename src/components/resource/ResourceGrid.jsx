import ResourceGridRow from "./ResourceGridRow.jsx";

function ResourceGrid({ data_rows, format_grid, format_events }) {
  console.log(1, format_grid);
  return (
    <div className="container grid">
      <ResourceGridHeader format_grid={format_grid} />
      {data_rows.map((data_row, index) => (
        <ResourceGridRow
          key={index}
          data_row={data_row}
          format_grid={format_grid}
          format_events={format_events}
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

export default ResourceGrid;
