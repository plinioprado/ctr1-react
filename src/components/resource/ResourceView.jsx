import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../../SessionContext";

import ResourceHeader from "./ResourceHeader";
import ResourceFilters from "./ResourceFilters";
import ResourceOne from "./ResourceOne";
import ResourceMany from "./ResourceMany";
import ResourceFooter from "./ResourceFooter";
import ResourceModal from "./ResourceModal";

import { get, post, put, del, download } from "../../data/request";

function ResourceView() {
  const navigate = useNavigate();
  const urlSearch = useLocation().search;
  const params = useParams();
  const session = useContext(SessionContext);

  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({});
  const [format, setFormat] = useState(null);
  const [modal, setModal] = useState({ h3: "Upload", open: false });
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
        setMessage("");
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

  const onDownload = async (request_url) => {
    try {
      const message = await download(request_url, session.api_key);
      setMessage(message);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const onReload = () => {
    setReload(!reload);
  };

  // CRUD actions

  const onGet = async (request_url, route_url) => {
    try {
      if (request_url) {
        const response = await get(request_url, session.api_key);
        setData(response.data);
      }
      if (route_url) navigate(route_url);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const onPost = async (request_url, route_url) => {
    try {
      const response = await post(request_url, session.api_key, data);
      setData(response.data);
      if (route_url) navigate(route_url);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const onPut = async (request_url, route_url) => {
    try {
      const response = await put(request_url, session.api_key, data);
      setData(response.data);
      if (route_url) navigate(route_url);
    } catch (err) {
      setMessage(err.message);
    }
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

  // Modal actions

  const modalOpen = () => {
    if (modal) {
      setModal({
        ...modal,
        open: true,
      });
    }
  };

  const modalClose = () => {
    onGet("/api/ledger/acc", "/resource/ledger/acc");
  };

  const onModalPost = () => {
    console.log("will post");
    modalClose();
  };

  // Actions

  const actions = {
    get: onGet,
    post: onPost,
    put: onPut,
    delete: onDelete,
    download: onDownload,
    modalOpen: modalOpen,
  };

  const modalActions = {
    close: modalClose,
    post: onModalPost,
  };

  return (
    <main>
      {!data || !format ? (
        <div className="container">
          <p>Loading</p>
        </div>
      ) : (
        <div className="container">
          {format.header && (
            <ResourceHeader
              actions={actions}
              format_h2={format.h2}
              format_header={format.header}
            />
          )}
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
              data_rows={data && Array.isArray(data) ? data : []}
              format_grid={format.many}
              format_events={
                format.events
                  ? format.events.filter((event) => event.local === "grid")
                  : []
              }
            />
          )}
          {format.footer && (
            <ResourceFooter actions={actions} format_footer={format.footer} />
          )}
        </div>
      )}
      <div className="text-error">{message}</div>
      {format && format.modal && (
        <ResourceModal format_modal={format.modal} actions={modalActions} />
      )}
    </main>
  );
}

export default ResourceView;
