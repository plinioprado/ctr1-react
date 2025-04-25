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
      .filter((op) => op.value === `/${params.table}`)[0]
      .key.replace("_path_routing", "_path_api");
    const url =
      "ctr1" + session.menu_options.filter((op) => op.key === key)[0].value;
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
  }, [location.key, params.table]);

  const goto = (e, val) => {
    navigate(`/${params.table}/${val}`);
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
    return (
      <tr index={row_index}>
        {format &&
          format.columns.map((col, col_index) => (
            <td key={col_index} scope="row">
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
