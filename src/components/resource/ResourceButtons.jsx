function ResourceButtons({ buttons, onNavigate }) {
  return (
    <>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={"btn btn-primary"}
          type={"button"}
          onClick={() => onNavigate(`/resource${button.rest_url}`)}
          disabled={button.disabled}
        >
          {button.label}
        </button>
      ))}
    </>
  );
}
export default ResourceButtons;
