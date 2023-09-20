import { Formik } from 'formik'
import React from 'react'
import { Button, Form } from 'react-bootstrap'

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
          <Form.Control
            type="text"
            id="messageText"
            aria-describedby="messageText"
            value={values.messageText}
            onChange={handleChange}
          />
          <Button as="input" type="submit" value="Submit" disabled={isSubmitting}/>
        </Form>
      )}

    </Formik>
    </div>
  )
}

export default InputField