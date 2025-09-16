import Field from "../fields/Field";

function ResourceFilters({
  filter_values,
  format_filters,
  onFiltersChange,
  onReload,
}) {
  return (
    <div className="row filters">
      {format_filters.map((format_field, index) => (
        <Field
          key={index}
          format_field={format_field}
          data_field={filter_values[format_field.name]}
          handleChange={onFiltersChange}
        />
      ))}
      <div className="col-md-2" key={format_filters.length}>
        <button type="button" className="btn btn-primary" onClick={onReload}>
          Reload
        </button>
      </div>
    </div>
  );
}
export default ResourceFilters;
