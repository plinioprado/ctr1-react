import InputAmount from "../fields/InputAmount";
import InputInteger from "../fields/InputInteger";
import InputSelect from "../fields/InputSelect";
import InputText from "../fields/InputText";

function TabRows({ dataRows, formatRows, dataChange }) {
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
        {formatRows.columns
          .filter((format_field) => format_field.type !== "amountdc2")
          .map((format_field, index) =>
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
          <a href="#">Delete</a>
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
              <a href="#">Add</a>
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
              />
            ))}
        </tbody>
      </table>
    </>
  );
}

export default TabRows;
