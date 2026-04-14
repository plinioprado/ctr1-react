function ResourceModal({ modal, modalActions }) {
  const modalClass =
    modal && modal.open ? "modal fade show d-block" : "modal fade";
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
          <div className="modal-header">
            <h5 className="modal-title">{modal && modal.h3}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => modalActions.close()}
            ></button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => modalActions.submit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceModal;
