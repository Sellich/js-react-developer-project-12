import React from 'react'
import { Button, Form } from 'react-bootstrap'

const InputField = () => {
  return (
    <div>
      <Form>
        <Form.Control
          type="text"
          id="messageText"
          aria-describedby="messageText"
        />
        <Button as="input" type="submit" value="Submit" />
      </Form>
    </div>
  )
}

export default InputField