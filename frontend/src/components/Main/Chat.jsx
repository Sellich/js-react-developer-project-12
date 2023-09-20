import React from 'react'
import Messages from './Messages'
import InputField from './InputField'
import { Container, Row } from 'react-bootstrap'

const Chat = ({messages}) => {
  return (
    <Container>
      <Row>
        <Messages messages={messages}/>
      </Row>
      <Row>
        <InputField/>
      </Row>
    </Container>
  )
}

export default Chat