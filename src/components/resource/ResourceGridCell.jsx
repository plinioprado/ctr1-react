function ResourceGridCell({ cell_value, cell_type, route_url, md }) {
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
      {route_url == undefined ? value : <a href={route_url}>{value}</a>}
    </div>
  );
}

export default ResourceGridCell;
