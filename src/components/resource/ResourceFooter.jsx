import ResourceButtons from "./ResourceButtons";
function ResourceFooter({ formatFooter, onNavigate, onPost, onPut, onDelete }) {
  return (
    <div className="d-flex justify-content-end">
      {formatFooter && formatFooter.buttons && (
        <ResourceButtons
          buttons={formatFooter.buttons}
          onDelete={onDelete}
          onNavigate={onNavigate}
          onPost={onPost}
          onPut={onPut}
        />
      )}
    </div>
  );
}

export default ResourceFooter;
