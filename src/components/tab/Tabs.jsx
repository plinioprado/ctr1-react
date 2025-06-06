import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { SessionContext } from "../../SessionContext";

import { get } from "../../data/request";

function TabList() {
  const { session } = useContext(SessionContext);
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [format, setFormat] = useState(null);

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
    }
    fetchData();
  }, [location.key, params.component, params.resource, params.id]);

  const goto = (e, val) => {
    navigate(`/${params.component}/${params.resource}/${val}`);
    e.preventDefault();
  };

  function TableHead() {
    return (
      <thead>
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
          <h2>{format.h2}</h2>
          <div className="data-table-header">
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
