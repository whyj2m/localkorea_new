import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/place/PlaceModal.css";
import { FaExternalLinkAlt, FaCopy } from "react-icons/fa";

function PlaceModal({ shareUrl }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        console.log("URL이 클립보드에 복사되었습니다.");
        handleClose(); // 복사 후 모달 닫기
      })
      .catch((err) => {
        console.error("URL을 클립보드에 복사할 수 없습니다.", err);
      });
  };

  return (
    <div>
      <Button
        className="btn icon-btn"
        variant="outline-primary"
        onClick={handleShow}
      >
        <FaExternalLinkAlt />
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>공유하기</Modal.Title>
        </Modal.Header>
        <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
        <Modal.Body className="modal-body">{shareUrl}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn_copy"
            variant="primary"
            onClick={copyToClipboard}
          >
            <FaCopy /> 복사하기
          </Button>
          <Button
            className="btn_close"
            variant="secondary"
            onClick={handleClose}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PlaceModal;
