function ResourcesHeader({ format, goto }) {
  const { h2, events } = format;
  const createEvent = events?.create;

  const getClickParam = (value) =>
    value === "default" ? "new" : `new?${createEvent.param}=${value}`;

  const handleClick = (e, value) => {
    e.preventDefault();
    goto(e, value);
  };

  return (
    <div className="data-table-header">
      <h2>{h2}</h2>
      {createEvent?.type === "dropdown" ? (
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {createEvent.text}
          </button>
          <ul className="dropdown-menu">
            {createEvent.options.map(({ value, label }, idx) => (
              <li key={idx}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => handleClick(e, getClickParam(value))}
                >
                  {label.replace("_", " ")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : createEvent ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => handleClick(e, "new")}
        >
          {createEvent.text}
        </button>
      ) : null}
    </div>
  );
}

export default ResourcesHeader;
