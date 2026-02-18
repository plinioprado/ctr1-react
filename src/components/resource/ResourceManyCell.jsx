function ResourceGridCell({ value_cell, format_cell, route_url }) {
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
    format_cell.type == "amount"
      ? formatAmount(value_cell)
      : format_cell.type == "percentage"
      ? formatPercentage(value_cell)
      : format_cell.type == "boolean"
      ? value_cell
        ? "Yes"
        : "No"
      : value_cell;

  const cell_class =
    format_cell.type == "integer"
      ? " integer"
      : format_cell.type == "amount"
      ? " amount"
      : format_cell.type == "percentage"
      ? " percentage"
      : "";
  const col = format_cell.md ? `col-md-${format_cell.md}` : "col";
  return (
    <>
      {format_cell.display !== "none" && (
        <div className={`${col}${cell_class}`}>
          {route_url == undefined ? (
            value
          ) : (
            <a href={"/" + route_url}>{value}</a>
          )}
        </div>
      )}
    </>
  );
}

export default ResourceGridCell;
