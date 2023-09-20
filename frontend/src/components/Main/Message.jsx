import React from 'react'
import { Card } from 'react-bootstrap'

const Message = ({message}) => {
  return (
    <Card body> 
      {message} 
    </Card>
  )
}

export default Message