import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { UserContext } from '../../App'

const Message = ({message}) => {
  const currentUser = useContext(UserContext);
  console.log(currentUser.username, message.username);

  return (
    <Card body style={{width: '100px', float: currentUser.username === message.username ? 'right' : 'left', wordWrap: 'break-word'}}>
      {message.body} 
    </Card>
  )
}

export default Message