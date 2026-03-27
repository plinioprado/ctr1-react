import ResourceButtons from "./ResourceButtons";
function ResourceFooter({ formatFooter, onNavigate, onPost, onPut, onDelete }) {
  const footerButtons =
    formatFooter?.buttons?.filter(
      (button) => button.request_type !== "download",
    ) || [];

  return (
    <div className="d-flex justify-content-end">
      {footerButtons.length > 0 && (
        <ResourceButtons
          buttons={footerButtons}
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
