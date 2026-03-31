import ResourceButtons from "./ResourceButtons";
import ResourceButtonsAction from "./ResourceButtonsAction";

function ResourceHeader({ actions, format, headerButtons, onNavigate }) {
  return (
    <div className="content-header">
      <h2>{format.h2}</h2>
      {headerButtons && headerButtons.length > 0 && (
        <ResourceButtonsAction actions={actions} buttons={headerButtons} />
      )}
      {headerButtons && headerButtons.length > 0 && (
        <ResourceButtons buttons={headerButtons} onNavigate={onNavigate} />
      )}
    </div>
  );
}

export default ResourceHeader;
