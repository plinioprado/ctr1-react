import ButtonDefault from "../button/ButtonDefault";
import ButtonDropdown from "../button/ButtonDropdown";

function ResourceButtons({ buttons, onNavigate, onPost, onPut, onDelete }) {
  const onClick = (request_type, request_url, route_url) => {
    if (request_type === "post") {
      onPost(request_url, route_url);
    } else if (request_type === "put") {
      onPut(request_url, route_url);
    } else if (request_type === "delete") {
      onDelete(request_url, route_url);
    } else {
      onNavigate(route_url);
    }
  };
  return (
    <>
      {buttons
        .filter((button) => button.type !== "action-dropdown")
        .map((button, index) =>
          button.options ? (
            <ButtonDropdown
              disabled={button.disabled}
              key={"b" + index}
              label={button.label}
              onClick={onClick}
              options={button.options}
              request_type={button.request_type}
              request_url={button.request_url}
              route_url={button.route_url}
              route_param={button.route_param}
            />
          ) : (
            <ButtonDefault
              disabled={button.disabled}
              key={"b" + index}
              label={button.label}
              onClick={() =>
                onClick(
                  button.request_type,
                  button.request_url,
                  button.route_url,
                )
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
