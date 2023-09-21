import { Formik } from 'formik'
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const InputField = ({sendMessage}) => {
  return (
    <div>
    <Formik initialValues={{messageText: ''}} onSubmit={(values, {setSubmitting, resetForm}) => {
      setSubmitting(false);
      resetForm();
      sendMessage(values.messageText);
    }}>
      {({values, isSubmitting, handleChange, handleSubmit}) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Control
                type="text"
                id="messageText"
                aria-describedby="messageText"
                value={values.messageText}
                onChange={handleChange}
              />
            </Col>
            <Col md={{ span: 2, offset: 4 }}>
              <Button as="input" type="submit" value="Send message" disabled={isSubmitting}/>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
    </div>
  )
}

export default InputField