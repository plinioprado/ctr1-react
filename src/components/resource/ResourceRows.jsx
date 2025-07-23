import InputAmount from "../fields/InputAmount";
import InputInteger from "../fields/InputInteger";
import InputSelect from "../fields/InputSelect";
import InputText from "../fields/InputText";

function ResourceRows({ dataRows, formatRows, dataChange }) {
  const addRow = (e) => {
    if (!dataRows || !formatRows) return;
    let newRow = {};
    for (const key of Object.keys(dataRows[0])) {
      newRow[key] = ["integer", "amount"].includes(
        formatRows.columns.filter((f) => f.name === key)[0].type,
      )
        ? 0
        : "";
    }
    dataChange("rows", dataRows.concat(newRow));
    e.preventDefault();
  };
  const subRow = (e, key) => {
    dataChange(
      "rows",
      dataRows.filter((_row, index) => index !== key),
    );
    e.preventDefault();
  };
  const rowsHandleChange = (rowKey, dr) => {
    dataChange(
      "rows",
      dataRows.map((row, index) => (index === rowKey ? dr : row)),
    );
  };
  function TabRow({ dataRow, formatRows, rowKey, rowsHandleChange }) {
    const rowHandlehange = (e, val) => {
      rowsHandleChange(rowKey, {
        ...dataRow,
        [e.target.name]: val !== undefined ? val : e.target.value,
      });
    };

    return (
      <tr key={rowKey}>
        {formatRows.columns.map((format_field, index) =>
          format_field.type === "select" ? (
            <td width={(format_field.md / 12) * 100 + "%"} key={index}>
              <InputSelect
                data_field={dataRow[format_field.name]}
                format_field={format_field}
                handleChange={rowHandlehange}
              />
            </td>
          ) : format_field.type === "integer" ? (
            <td width={(format_field.md / 12) * 100 + "%"} key={index}>
              <InputInteger
                data_field={dataRow[format_field.name]}
                format_field={format_field}
                handleChange={rowHandlehange}
              />
            </td>
          ) : format_field.type === "amount" ? (
            <td width={(format_field.md / 12) * 100 + "%"} key={index}>
              <InputAmount
                data_field={dataRow[format_field.name]}
                format_field={format_field}
                handleChange={rowHandlehange}
              />
            </td>
          ) : (
            <td width={(format_field.md / 12) * 100 + "%"} key={index}>
              <InputText
                data_field={dataRow[format_field.name]}
                format_field={format_field}
                handleChange={rowHandlehange}
              />
            </td>
          ),
        )}
        <td>
          {dataRows.length > 2 && (
            <a href="#" onClick={(e) => subRow(e, rowKey)}>
              Delete
            </a>
          )}
        </td>
      </tr>
    );
  }
  return (
    <>
      <hr />
      <table className="table">
        <thead>
          <tr>
            {formatRows.columns.map((format_field, index) => (
              <th scope="col" key={index}>
                {format_field.label}
              </th>
            ))}
            <th scope="col">
              <a href="#" onClick={addRow}>
                Add
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataRows &&
            dataRows.map((dataRow, index) => (
              <TabRow
                dataRow={dataRow}
                formatRows={formatRows}
                rowsHandleChange={rowsHandleChange}
                rowKey={index}
                key={index}
              />
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ResourceRows;
