import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../../SessionContext";

import ResourceFilters from "./ResourceFilters";
import ResourceFooter from "./ResourceFooter";
import ResourceOne from "./ResourceOne";
import ResourceMany from "./ResourceMany";
import ResourceHeader from "./ResourceHeader";

import { get, post, put, del } from "../../data/request";

function ResourceView() {
  const navigate = useNavigate();
  const urlSearch = useLocation().search;
  const params = useParams();
  const session = useContext(SessionContext);

  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({});
  const [format, setFormat] = useState(null);
  const [reload, setReload] = useState(false);

  const getQueryString = () => {
    if (urlSearch && urlSearch !== "") return urlSearch;
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
      try {
        const url = getRestUrl();
        const response = await get(url, session.api_key, "");

        setData(response.data);
        setFilters(response.filters);
        setFormat(response.format);
      } catch (error) {
        setMessage(error.message);
      }
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

  const onDelete = async (request_url, route_url) => {
    try {
      const url_delete = request_url.replace("{id}", params.id);
      await del(url_delete, session.api_key);
      navigate(route_url);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const onNavigate = (route_url) => {
    navigate(route_url);
  };

  const onPost = async (request_url, route_url) => {
    try {
      const response = await post(request_url, session.api_key, data);
      setData(response.data);
      navigate(route_url);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const onPut = async (request_url, route_url) => {
    try {
      const response = await put(request_url, session.api_key, data);
      setData(response.data);
      navigate(route_url);
    } catch (err) {
      setMessage(err.message);
    }
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
          {format.one && (
            <ResourceOne
              format_one={format.one}
              format_options={format.options}
              data={data}
              is_new={false}
              onDataChange={onDataChange}
            />
          )}
          {format.many && (
            <ResourceMany
              data_rows={data_rows}
              format_grid={format.many}
              format_events={
                format.events
                  ? format.events.filter((event) => event.local === "grid")
                  : []
              }
            />
          )}
          {format.footer && (
            <ResourceFooter
              formatFooter={format.footer}
              onDelete={onDelete}
              onNavigate={onNavigate}
              onPost={onPost}
              onPut={onPut}
            />
          )}
        </div>
      )}
      <div className="text-error">{message}</div>
    </main>
  );
}

export default ResourceView;
