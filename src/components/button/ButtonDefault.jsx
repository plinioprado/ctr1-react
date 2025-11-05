function ButtonDefault({
  disabled,
  label,
  onClick,
  request_type,
  request_url,
}) {
  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={() => onClick(request_type, request_url)}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
export default ButtonDefault;
