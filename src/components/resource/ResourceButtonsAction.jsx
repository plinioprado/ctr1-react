import ButtonActiondDropdown from "../button/ButtonActionDropdown";

function ResourceButtonsAction({ actions, buttons }) {
  return (
    <div className="d-flex justify-content-end" key="a">
      {buttons
        .filter((button) => button.type === "action-dropdown")
        .map((button, idx) => (
          <ButtonActiondDropdown key={idx} actions={actions} button={button} />
        ))}
    </div>
  );
}

export default ResourceButtonsAction;
