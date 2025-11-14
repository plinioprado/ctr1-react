import ResourceGridCell from "./ResourceGridCell.jsx";

function ResourceGridRow({ data_row, format_grid, format_events }) {
  const getRouteUrl = (name) => {
    const event = format_events.find((e) => e.name === name);
    return event
      ? event.route_url.replace("{value}", data_row[name])
      : undefined;
  };

  return (
    <div className="row grid-data">
      {format_grid.columns
        .filter((f) => f.display !== false)
        .map((column, index) => (
          <ResourceGridCell
            key={index}
            cell_value={data_row[column.name]}
            cell_type={column.type}
            primary_key={column.primary_key == true}
            route_url={getRouteUrl(column.name)}
            md={column.md}
          />
        ))}
    </div>
  );
}

export default ResourceGridRow;
