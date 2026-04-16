import ResourceButtons from "./ResourceButtons";

function ResourceModal({ format_modal, actions }) {
  const modalClass =
    format_modal && format_modal.open
      ? "modal fade show d-block"
      : "modal fade";
  return (
    <div
      className={modalClass}
      id="resourceModalUpload"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="col md-12 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => actions.close()}
                ></button>
              </div>
            </div>
            <div className="row">
              <div className="col md-12">
                <label htmlFor="formFile" className="form-label">
                  File to upload
                </label>
                <input className="form-control" type="file" id="formFile" />
              </div>
            </div>
            <div className="row">
              <div className="col md-12 d-flex justify-content-end">
                {format_modal && format_modal.buttons && (
                  <ResourceButtons
                    format_buttons={format_modal.buttons}
                    actions={actions}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceModal;
