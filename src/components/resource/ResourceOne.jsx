import ResourceOneRow from "./ResourceOneRow";

function ResourceOne({
  format_one,
  format_options,
  data,
  onDataChange,
  is_new,
}) {
  return (
    <div className="container form">
      {format_one.map((format_one_row, index) => (
        <ResourceOneRow
          key={index}
          format_one_row={format_one_row}
          format_options={format_options}
          data={data}
          onDataChange={onDataChange}
          is_new={is_new}
        />
      ))}
    </div>
  );
}

export default ResourceOne;
