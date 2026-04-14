import ButtonDefault2 from "../button/ButtonDefault2";
import ButtonDropdown2 from "../button/ButtonDropdown2";

function ResourceButton2({ actions, format_button }) {
  return (
    format_button &&
    (format_button.dropdown ? (
      <ButtonDropdown2 format_button={format_button} actions={actions} />
    ) : (
      <ButtonDefault2 button={format_button} actions={actions} />
    ))
  );
}

export default ResourceButton2;
