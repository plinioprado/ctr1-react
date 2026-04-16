import ResourceButtons from "./ResourceButtons";

function ResourceFooter({ actions, format_footer }) {
  return (
    <div className="d-flex justify-content-end">
      {format_footer && format_footer.buttons && (
        <ResourceButtons
          actions={actions}
          format_buttons={format_footer.buttons}
        />
      )}
    </div>
  );
}

export default ResourceFooter;
