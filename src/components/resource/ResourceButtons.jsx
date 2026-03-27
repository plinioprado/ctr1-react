import ButtonDefault from "../button/ButtonDefault";
import ButtonDownload from "../button/ButtonDownload";
import ButtonDropdown from "../button/ButtonDropdown";

function ResourceButtons({
  buttons,
  onNavigate,
  onPost,
  onPut,
  onDelete,
  onDownload,
}) {
  const onClick = (request_type, request_url, route_url) => {
    if (request_type === "post") {
      onPost(request_url, route_url);
    } else if (request_type === "put") {
      onPut(request_url, route_url);
    } else if (request_type === "delete") {
      onDelete(request_url, route_url);
    } else if (request_type === "download") {
      onDownload(request_url, route_url);
    } else {
      onNavigate(route_url);
    }
  };
  return (
    <>
      {buttons.map((button, index) =>
        button.options ? (
          <ButtonDropdown
            disabled={button.disabled}
            key={index}
            label={button.label}
            onClick={onClick}
            options={button.options}
            request_type={button.request_type}
            request_url={button.request_url}
            route_url={button.route_url}
            route_param={button.route_param}
          />
        ) : button.request_type === "download" ? (
          <ButtonDownload
            disabled={button.disabled}
            key={index}
            label={button.label}
            onClick={onDownload}
            request_url={button.request_url}
            route_url={button.route_url}
          />
        ) : (
          <ButtonDefault
            disabled={button.disabled}
            key={index}
            label={button.label}
            onClick={() =>
              onClick(button.request_type, button.request_url, button.route_url)
            }
            request_type={button.request_type}
            request_url={button.request_url}
            route_url={button.route_url}
          />
        ),
      )}
    </>
  );
}
export default ResourceButtons;
