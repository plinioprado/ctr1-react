import ResourceManyCell from "./ResourceManyCell.jsx";

function ResourceManyRow({ data_row, format_grid, format_events }) {
  // route_url calculated here because it may reffer to other data in the row

  const getRouteUrl = (format_cell, data_cell) => {
    if (format_cell.route_url) {
      let route_url = format_cell.route_url.replace("{value}", data_cell);

      for (const fc of format_grid.columns) {
        route_url = route_url.replace(`{${fc.name}}`, data_row[fc.name]);
      }
      return route_url;
    }

    const event = format_events.find((e) => e.name === format_cell.name);
    if (event) return event.route_url.replace("{value}", data_row[data_cell]);

    return undefined;
  };

  return (
    <div className="row grid-data">
      {format_grid.columns
        .filter((f) => f.display !== false && f.display !== "none")
        .map((format_cell, index) => (
          <ResourceManyCell
            key={index}
            value_cell={data_row[format_cell.name]}
            format_cell={format_cell}
            primary_key={format_cell.primary_key === true}
            route_url={getRouteUrl(format_cell, data_row[format_cell.name])}
            md={format_cell.md}
          />
        ))}
    </div>
  );
}

export default ResourceManyRow;
