import ResourceButtons from "./ResourceButtons";

function ResourceHeader({ format, headerButtons, onDownload, onNavigate }) {
  return (
    <div className="content-header">
      <h2>{format.h2}</h2>
      {headerButtons && headerButtons.length > 0 && (
        <ResourceButtons
          buttons={headerButtons}
          onDownload={onDownload}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}

export default ResourceHeader;
