import ResourceButtons from "./ResourceButtons";

function ResourceHeader({ actions, format_h2, format_header }) {
  return (
    <div className="content-header">
      <h2>{format_h2}</h2>
      {format_header && format_header.buttons && (
        <ResourceButtons
          actions={actions}
          format_buttons={format_header.buttons}
        />
      )}
    </div>
  );
}

export default ResourceHeader;
