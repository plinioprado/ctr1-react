function ResourcesHeader({ format, goto }) {
  const getClickParam = (value) => {
    return value == "default"
      ? "new"
      : `new?${format.events.create.param}=${value}`;
  };

  return (
    <div className="data-table-header">
      <h2>{format.h2}</h2>
      {format.events &&
      format.events.create &&
      format.events.create.type &&
      format.events.create.type === "dropdown" ? (
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {format.events.create.text}
          </button>
          <ul className="dropdown-menu">
            {format.events.create.options.map((option, index) => (
              <li key={index}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => goto(e, getClickParam(option.value))}
                >
                  {option.label.replace("_", " ")}
                </a>
              </li>
            ))}
            {/* <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </li> */}
          </ul>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => goto(e, "new")}
        >
          {format &&
            format.events &&
            format.events.create &&
            format.events.create.text}
        </button>
      )}
    </div>
  );
}

export default ResourcesHeader;
