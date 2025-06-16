import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { SessionContext } from "../../SessionContext";

import { get } from "../../data/request";

import FieldTextBlur from "../fields/FieldTextBlur";
import FieldDateBlur from "../fields/FieldDateBlur";

function TabList() {
  const { session } = useContext(SessionContext);
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [format, setFormat] = useState(null);
  const [filters, setfilters] = useState({});

  const getQueryString = () => {
    if (!format || !format.filters || filters == {}) return "";

    let query = "";
    format.filters.forEach((ff) => {
      if (!["", null, undefined].includes(filters[ff.name])) {
        if (query === "") query += "?";
        else query += "&";
        query += `${ff.name}=${filters[ff.name] || ""}`;
      }
    });
    return query;
  };

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
      const qString = location.search || "";
      const response = await get(`${url}${qString}`, session.user.api_key, "");

      setData(response.data);
      setFormat(response.format);
      setfilters(response.filters);
    }
    fetchData();
  }, [location.href]);

  const goto = (e, val) => {
    const url = `/${params.component}/${params.resource}/${val}`;
    navigate(url);
    e.preventDefault();
  };

  const reload = () => {
    const qString = getQueryString();
    const url = `/${params.component}/${params.resource}${qString}`;
    navigate(url);
  };

  const handleFilterChange = (name, value) => {
    if (!["", null, undefined].includes(value)) {
      setfilters({
        ...filters,
        [name]: value,
      });
    } else {
      const { [name]: _, ...rest } = filters;
      setfilters(rest);
    }
  };

  function TableHead() {
    return (
      <thead>
        {format && format.filters && (
          <tr>
            <td colSpan={format.columns.length}>
              <div className="table-filter">
                {format.filters &&
                  format.filters.map((format_filter) =>
                    format_filter.type === "date" ? (
                      <FieldDateBlur
                        data_field={filters[format_filter.name] || ""}
                        format_field={format_filter}
                        handleFilterChange={handleFilterChange}
                        key={format_filter.name}
                      />
                    ) : (
                      <FieldTextBlur
                        data_field={filters[format_filter.name] || ""}
                        format_field={format_filter}
                        handleFilterChange={handleFilterChange}
                        key={format_filter.name}
                      />
                    ),
                  )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={reload}
                >
                  Reload
                </button>
              </div>
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
