import ButtonDefault from "../button/ButtonDefault";
import ButtonDropdown from "../button/ButtonDropdown";

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
      {buttons.map((button, index) =>
        button.options ? (
          <ButtonDropdown
            disabled={button.disabled}
            key={index}
            label={button.label}
            onClick={onClick}
            options={button.options}
            param={button.param}
            request_type={button.request_type}
            request_url={button.request_url}
          />
        ) : (
          <ButtonDefault
            disabled={button.disabled}
            key={index}
            label={button.label}
            onClick={onClick}
            request_type={button.request_type}
            request_url={button.request_url}
          />
        ),
      )}
    </>
  );
}
export default ResourceButtons;
