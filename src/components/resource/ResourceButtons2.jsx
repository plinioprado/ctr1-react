import ResourceButton2 from "./ResourceButton2";

function ResourceButtons2({ actions, format_buttons }) {
  return (
    <>
      {format_buttons &&
        format_buttons.map((format_button, idx) => (
          <ResourceButton2
            key={idx}
            format_button={format_button}
            actions={actions}
          />
        ))}
    </>
  );
}

export default ResourceButtons2;
