function ButtonDropdown({ actions, format_button }) {
  return (
    <div className="dropdown" key={format_button.name}>
      <button
        aria-expanded="false"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        disabled={format_button.disabled}
        type="button"
      >
        {format_button.label}
      </button>
      <ul className="dropdown-menu">
        {format_button.options.map(({ value, label }, idx) => (
          <li key={idx}>
            <a
              className="dropdown-item"
              href=""
              onClick={(e) => {
                e.preventDefault();
                actions[format_button.action](value);
              }}
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
