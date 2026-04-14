function ButtonDefault2({ actions, button }) {
  return (
    <button
      className="btn btn-primary"
      type="button"
      disabled={button.disabled}
      onClick={(e) => {
        e.preventDefault();
        actions[button.request_type](button.request_url, button.route_url);
      }}
    >
      {button.label}
    </button>
  );
}

export default ButtonDefault2;
