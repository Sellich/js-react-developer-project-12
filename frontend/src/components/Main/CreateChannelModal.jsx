import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const CreateChannelModal = ({handleSubmit, show, setShow, modalName, inputPlaceholder, id}) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e, id)} action="">
          <Form.Control name='channelName' type='text' placeholder={inputPlaceholder}/>
          <Button onClick={() => setShow(false)} type='submit'>
            Create
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateChannelModal