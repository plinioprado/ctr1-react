function ButtonDownload({ disabled, label, onClick, request_url, route_url }) {
  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={() => onClick(request_url, route_url)}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default ButtonDownload;
