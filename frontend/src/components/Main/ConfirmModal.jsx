import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ConfirmModal = ({show, setShow}) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        Are you sure?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Yes, delete</Button>
        <Button onClick={() => setShow(false)}>No</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal