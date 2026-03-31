function ButtonActionDropdown({ actions, button, index }) {
  return (
    <div className="dropdown" key={index}>
      <button
        aria-expanded="false"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        disabled={button.disabled}
        type="button"
      >
        {button.label}
      </button>
      <ul className="dropdown-menu">
        {button.options.map(({ value, label }, idx) => (
          <li key={idx}>
            <a
              className="dropdown-item"
              href=""
              onClick={(e) => {
                e.preventDefault();
                actions[button.action](value);
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
export default ButtonActionDropdown;
