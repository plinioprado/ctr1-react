function ButtonDropdown({
  disabled,
  label,
  onClick,
  options,
  param,
  request_type,
  request_url,
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
                onClick(request_type, `${request_url}?${param}=${value}`)
              }
              // todo: remove the '#' after the link
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
