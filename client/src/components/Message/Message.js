import React from "react";
import Modal from "react-bootstrap/Modal";

import "./Message.css";

function Message(props) {

  return (
    <>
      <Modal className="message"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
          <div className="bodymessage" >
{props.bodymessage}</div>
        </Modal.Body>
        <button onClick={props.onHide}>אישור</button>
      </Modal>
    </>
  );
}

export default Message;
