import ResourceButtons2 from "./ResourceButtons2";

function ResourceFooter2({ actions, format_header }) {
  return (
    <div className="d-flex justify-content-end">
      {format_header && format_header.buttons && (
        <ResourceButtons2
          actions={actions}
          format_buttons={format_header.buttons}
        />
      )}
    </div>
  );
}

export default ResourceFooter2;
