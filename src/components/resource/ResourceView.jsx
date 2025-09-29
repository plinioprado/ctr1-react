import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../../SessionContext";

import ResourceFilters from "./ResourceFilters";
import ResourceForm from "./ResourceForm";
import ResourceGrid from "./ResourceGrid";
import ResourceHeader from "./ResourceHeader";

import { get } from "../../data/request";

function ResourceView() {
  const location = useLocation(null);
  const navigate = useNavigate();
  const params = useParams();
  const session = useContext(SessionContext);

  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({});
  const [format, setFormat] = useState(null);
  const [reload, setReload] = useState(false);

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

  const getRestUrl = () => {
    const component = params.component || ""; // mandatory
    const resource = params.resource || ""; // mandatory
    const view = params.view ? `/${params.view}` : ""; // optional
    const id = params.id ? `/${params.id}` : ""; // optional
    const qString = getQueryString(); // optional

    return `/api/${component}/${resource}${view}${id}${qString}`;
  };

  useEffect(() => {
    async function fetchData() {
      const url = getRestUrl();
      const response = await get(url, session.api_key, "");

      setData(response.data);
      setFilters(response.filters);
      setFormat(response.format);
    }
    fetchData();
  }, [params, reload]);

  const onDataChange = (e, val) => {
    // val optional param because e.target.val is always text
    setData({
      ...data,
      [e.target.name]: val !== undefined ? val : e.target.value,
    });
  };

  const onFiltersChange = (e, val) => {
    // val optional param because e.target.val is always text
    setFilters({
      ...filters,
      [e.target.name]: val !== undefined ? val : e.target.value,
    });
  };

  const onNavigate = (url) => {
    navigate(url);
  };

  const onReload = () => {
    setReload(!reload);
  };

  const data_rows = data && Array.isArray(data) ? data : [];

  return (
    <main>
      {!data || !format ? (
        <div className="container">
          <p>Loading</p>
        </div>
      ) : (
        <div className="container">
          <ResourceHeader format={format} onNavigate={onNavigate} />
          {format.filters && (
            <ResourceFilters
              filter_values={filters}
              format_filters={format.filters}
              onFiltersChange={onFiltersChange}
              onReload={onReload}
            />
          )}
          {format.fields && (
            <ResourceForm
              format_fields={format.fields}
              data={data}
              is_new={false}
              onDataChange={onDataChange}
            />
          )}
          {format.grid && (
            <ResourceGrid
              data_rows={data_rows}
              format_grid={format.grid}
              format_events={format.events.filter(
                (event) => event.local === "grid",
              )}
            />
          )}
        </div>
      )}
    </main>
  );
}

export default ResourceView;
