import ResourceButtons from "./ResourceButtons";

function ResourceHeader({ format, onNavigate }) {
  const buttons =
    format &&
    format.events &&
    format.events.filter &&
    format.events.filter((event) => event.local === "header");
  return (
    <div className="content-header">
      <h2>{format.h2}</h2>
      {buttons && <ResourceButtons buttons={buttons} onNavigate={onNavigate} />}
    </div>
  );
}

export default ResourceHeader;
