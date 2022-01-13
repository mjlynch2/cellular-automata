import { IconButton } from "@mui/material";
import { useRef } from "react";
import { Modal } from "bootstrap";
import Box from "./Box";
import Settings from "./Settings";

const Header = ({ generations }) => {
  const modalRef = useRef();

  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  };

  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-2">
        <IconButton aria-label="settings" color="inherit" onClick={showModal}>
          <i className="bi bi-gear-fill"></i>
        </IconButton>
      </div>
      <div className="col-8 text-center">
        <h2>Cellular Automata</h2>
      </div>
      <div className="col-2 text-end">
        <h5>{generations}</h5>
      </div>
      <Box modalRef={modalRef} hideModal={hideModal} title="settings">
        <Settings />
      </Box>
    </div>
  );
};

export default Header;
