import FieldText from "../fields/FieldText";

// todo: implement refresh button

function Filter({ formats, filtersData, handleFilterChange }) {
  const format = formats[0];
  const filterData = filtersData[0];
  const key = Object.keys(filterData)[0];
  const value = filtersData[key];
  return (
    <div>
      <FieldText
        data_field={value || ""}
        format_field={{ md: format.md, label: format.label, name: key }}
        handleChange={(e) => handleFilterChange(e)}
        key={key}
      />
    </div>
  );
}

export default Filter;
