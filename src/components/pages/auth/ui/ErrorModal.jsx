import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ErrorModal({ show, handleClose, content }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{content.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
