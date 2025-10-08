import ResourceButtons from "./ResourceButtons";

function ResourceHeader({ format, onNavigate }) {
  return (
    <div className="content-header">
      <h2>{format.h2}</h2>
      {format && format.header && format.header.buttons && (
        <ResourceButtons
          buttons={format.header.buttons}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}

export default ResourceHeader;
