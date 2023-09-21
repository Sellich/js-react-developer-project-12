import React from 'react'
import { ListGroup} from 'react-bootstrap';

const Channels = ({channels, activeChannel}) => {
  return (
    <ListGroup defaultActiveKey={'general'} className="flex-column">
      {channels && channels.map((channel) => {
        return  (
          <ListGroup.Item key={channel.id} action eventKey={channel.name}>
              {channel.name}
          </ListGroup.Item>)
      })}
    </ListGroup>
  )
}

export default Channels