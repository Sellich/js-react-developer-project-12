import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

const Channels = ({channels, activeChannel}) => {
  return (
    <div>
      <ListGroup>
        {channels && channels.map((channel) => {
          return  (
            <ListGroup.Item key={channel.id} active={channel.id === activeChannel}>
              {channel.name}
            </ListGroup.Item>)
        })}
      </ListGroup>
    </div>
  )
}

export default Channels