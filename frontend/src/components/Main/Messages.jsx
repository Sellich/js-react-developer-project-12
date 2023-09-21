import React from 'react'
import Message from './Message'
import { Col, Row } from 'react-bootstrap'

const Messages = ({messages}) => {
  return (
    <>
      {messages.map(message => {
        return (
          <Row className='mb-3'>
            <Col>
              <Message message={message}/>
            </Col>
          </Row>
        )
      }
      )}
    </>
  )
}

export default Messages