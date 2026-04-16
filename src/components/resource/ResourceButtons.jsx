import ResourceButton from "./ResourceButton";

function ResourceButtons({ actions, format_buttons }) {
  return (
    <>
      {format_buttons &&
        format_buttons.map((format_button, idx) => (
          <ResourceButton
            key={idx}
            format_button={format_button}
            actions={actions}
          />
        ))}
    </>
  );
}

export default ResourceButtons;
