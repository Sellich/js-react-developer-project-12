import React from 'react'
import { Card } from 'react-bootstrap'

const Message = ({message}) => {
  return (
    <Card body> 
      {message.body} 
    </Card>
  )
}

export default Message