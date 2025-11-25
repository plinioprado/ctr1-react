function ButtonDropdown({
  disabled,
  label,
  onClick,
  options,
  request_type,
  request_url,
  route_param,
  route_url,
}) {
  return (
    <div className="dropdown">
      <button
        aria-expanded="false"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        disabled={disabled}
        type="button"
      >
        {label}
      </button>
      <ul className="dropdown-menu">
        {options.map(({ value, label }, idx) => (
          <li key={idx}>
            <a
              className="dropdown-item"
              href=""
              onClick={() =>
                onClick(
                  request_type,
                  request_url,
                  `${route_url}?${route_param}=${value}`,
                )
              }
            >
              {label.replace("_", " ")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ButtonDropdown;
