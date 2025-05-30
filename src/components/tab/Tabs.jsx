import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { SessionContext } from "../../SessionContext";

import { get } from "../../data/request";

import TableFilter from "./TableFilter";

function TabList() {
  const { session } = useContext(SessionContext);
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [format, setFormat] = useState(null);
  const [filtersData, setFiltersData] = useState(null);

  const getUrl = () => {
    const key = session.menu_options
      .filter((op) => op.value === `/${params.component}/${params.resource}`)[0]
      .key.replace("_path_routing", "_path_api");
    const url = session.menu_options.filter((op) => op.key === key)[0].value;
    return url;
  };

  useEffect(() => {
    async function fetchData() {
      const url = getUrl();
      const response = await get(url, session.user.api_key, "");

      setData(response.data);
      setFormat(response.format);
      setFiltersData(response.filters);
    }
    fetchData();
  }, [location.key, params.component, params.resource, params.id]);

  const goto = (e, val) => {
    navigate(`/${params.component}/${params.resource}/${val}`);
    e.preventDefault();
  };

  const onFilterChange = (name, value) => {
    console.log(2, name, value);
    // const key = e.target.name;
    // const value = val || e.target.value;
    // const filters = filtersData.map((f) =>
    //   Object.keys(f)[0] === key ? { [key]: value } : f,
    // );
    // setFiltersData(filters);
  };

  function TableHead() {
    return (
      <thead>
        {format && format.filters && (
          <tr>
            <td colSpan={format.columns.length}>
              <TableFilter
                formats={format.filters}
                filtersData={filtersData}
                onFilterChange={onFilterChange}
              />
            </td>
          </tr>
        )}
        <tr>
          {format &&
            format.columns.map((col, index) => (
              <th key={index} scope="col">
                {col.header}
              </th>
            ))}
        </tr>
      </thead>
    );
  }

  function TableRow(row_item, row_index) {
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

    return (
      <tr index={row_index}>
        {format &&
          format.columns.map((col, col_index) => (
            <td
              key={col_index}
              scope="row"
              className={
                col.type == "integer"
                  ? "integer"
                  : col.type == "amount"
                  ? "amount"
                  : ""
              }
            >
              {col.primary ? (
                <a
                  href="#"
                  onClick={(e) => goto(e, data[row_item.row_index][col.name])}
                >
                  {data[row_item.row_index][col.name]}
                </a>
              ) : col.type === "boolean" ? (
                data[row_item.row_index][col.name] ? (
                  "Yes"
                ) : (
                  "No"
                )
              ) : col.type === "amount" ? (
                data && formatAmount(data[row_item.row_index][col.name])
              ) : (
                data[row_item.row_index][col.name]
              )}
            </td>
          ))}
      </tr>
    );
  }

  return (
    <main>
      {!data || !format ? (
        <div className="container">
          <p>Loading</p>
        </div>
      ) : (
        <div className="container">
          <div className="data-table-header">
            <h2>{format.h2}</h2>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => goto(e, "new")}
            >
              Create
            </button>
          </div>
          <table className="table">
            <TableHead />
            <tbody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={index} row_item={item} row_index={index} />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
export default TabList;
