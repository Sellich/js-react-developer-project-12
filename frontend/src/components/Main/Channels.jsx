import React, { useState } from 'react'
import { Button, Dropdown, Nav, NavItem} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toggleChannel } from '../../slices/channelsSlice';
import CreateChannelModal from './CreateChannelModal';
import ConfirmModal from './ConfirmModal';

const Channels = ({channels, currentChannelId, removeChannel, renameChannel}) => {
  const [show, setShow] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
  
  return (
    <Nav defaultActiveKey={1} className="flex-column">
      {channels && channels.map((channel) => {
        const {id, name, removable} = channel;
        return  (
            <Dropdown as={NavItem} eventKey={id} key={id}>
              <Button variant={currentChannelId === id ? `success` : 'primary'} onClick={() => dispatch(toggleChannel(id))}>{'# ' + name}</Button>

              {removable && <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />}

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {removeChannel(id); setShowConfirmModal(true);}}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => setShow(true)}>Edit</Dropdown.Item>
                <CreateChannelModal id={id} handleSubmit={renameChannel} show={show} setShow={setShow} modalName='Edit channel' inputPlaceholder='Channel name'/>
                <ConfirmModal show={showConfirmModal} setShow={setShowConfirmModal}/>
              </Dropdown.Menu>
            </Dropdown>)
      })}
    </Nav>
  )
}

export default Channels