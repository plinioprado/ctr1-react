import ResourceButtons2 from "./ResourceButtons2";

function ResourceHeader2({ actions, format_h2, format_header }) {
  return (
    <div className="content-header">
      <h2>{format_h2}</h2>
      {format_header && format_header.buttons && (
        <ResourceButtons2
          actions={actions}
          format_buttons={format_header.buttons}
        />
      )}
    </div>
  );
}

export default ResourceHeader2;
