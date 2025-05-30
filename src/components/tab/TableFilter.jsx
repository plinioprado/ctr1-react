import FieldText from "../fields/FieldText";

// todo: implement refresh button

function Filter({ formats, filtersData, onFilterChange }) {
  const format = formats[0];
  const filterData = filtersData[0];
  const key = Object.keys(filterData)[0];
  const value = filtersData[key];
  return (
    <div className="table-filter">
      <span>{formats[0].label}:</span>
      <FieldText
        data_field={value || ""}
        format_field={{ md: format.md, label: null, name: key }}
        handleChange={(e) => onFilterChange(e.target.name, e.target.value)}
        key={key}
      />
      <button type="button" className="btn btn-primary">
        Reload
      </button>
    </div>
  );
}

export default Filter;
