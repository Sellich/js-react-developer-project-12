import React from 'react'
import Messages from './Messages'
import InputField from './InputField'
import { Container, Row } from 'react-bootstrap'

const Chat = ({messages, sendMessage}) => {
  return (
    <Container fluid>
      <Row style={{width: '900px'}}>
        <Messages messages={messages}/>
      </Row>
      <Row style={{width: '900px'}}>
        <InputField sendMessage={sendMessage}/>
      </Row>
    </Container>
  )
}

export default Chat