const Box = ({ modalRef, hideModal, title, children }) => {
  const styles = {
    main: {
      backgroundColor: "#1b1b1b",
      color: "#f5f5f5",
    },
  };
  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content" style={styles.main}>
          <div className="modal-body">
            <div className="row align-items-top">
              <div className="col-1"></div>
              <div className="col-10 text-center">
                <h5>{title.toUpperCase()}</h5>
              </div>
              <div className="col-1 text-start">
                <button
                  className="btn-close btn-close-white"
                  onClick={hideModal}
                  aria-label="Close"
                  color="inherit"
                ></button>
              </div>
            </div>
            <div className="row">
              <div className="container px-3">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
