import ButtonDefault from "../button/ButtonDefault";
import ButtonDropdown from "../button/ButtonDropdown";

function ResourceButton({ actions, format_button }) {
  return (
    format_button &&
    (format_button.dropdown ? (
      <ButtonDropdown format_button={format_button} actions={actions} />
    ) : (
      <ButtonDefault format_button={format_button} actions={actions} />
    ))
  );
}

export default ResourceButton;
