function ResourceManyHeader({ format_grid }) {
  return (
    <div className="row grid-header">
      {format_grid.columns
        .filter((f) => f.display !== false && f.display !== "none")
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

export default ResourceManyHeader;
