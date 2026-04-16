function ButtonDefault({ actions, format_button }) {
  return (
    <button
      className="btn btn-primary"
      type="button"
      disabled={format_button.disabled}
      onClick={(e) => {
        e.preventDefault();
        actions[format_button.request_type](
          format_button.request_url,
          format_button.route_url,
        );
      }}
    >
      {format_button.label}
    </button>
  );
}

export default ButtonDefault;
