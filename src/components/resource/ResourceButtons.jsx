function ResourceButtons({ buttons, onNavigate, onPost, onPut, onDelete }) {
  const onClick = (request_type, request_url) => {
    if (request_type === "route") {
      onNavigate(request_url);
    } else if (request_type === "post") {
      onPost(request_url);
    } else if (request_type === "put") {
      onPut(request_url);
    } else if (request_type === "delete") {
      onDelete(request_url);
    }
  };
  return (
    <>
      {buttons.map((button, index) => (
        <button
          key={index}
          className="btn btn-primary"
          type="button"
          onClick={() => onClick(button.request_type, button.request_url)}
          disabled={button.disabled}
        >
          {button.label}
        </button>
      ))}
    </>
  );
}
export default ResourceButtons;
