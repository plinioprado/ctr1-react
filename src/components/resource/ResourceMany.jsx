import ResourceManyRow from "./ResourceManyRow";
import ResourceManyHeader from "./ResourceManyHeader";

function ResourceMany({ data_rows, format_grid, format_events }) {
  console.log(11);
  return (
    <div className="container-fluid grid">
      <ResourceManyHeader format_grid={format_grid} />
      {data_rows.map((data_row, index) => (
        <ResourceManyRow
          key={index}
          data_row={data_row}
          format_grid={format_grid}
          format_events={format_events}
        />
      ))}
    </div>
  );
}

export default ResourceMany;
