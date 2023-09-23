import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import {fetchChannels, addChannel, removeChannel, toggleChannel} from '../../slices/channelsSlice';
import { messagesSelectors } from '../../slices/messagesSlice';
import Channels from './Channels';
import Chat from './Chat';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { io } from "socket.io-client";
import { addMessage } from '../../slices/messagesSlice';
import CreateChannelModal from './CreateChannelModal';


const Main = () => {
  const navigate = useNavigate();
  const {username, token} = useContext(UserContext);
  const dispatch = useDispatch();
  const channelsState = useSelector((state) => state.channels);
  const messages = useSelector(messagesSelectors.selectAll);
  const [showModal, setShowModal] = useState(false);

  let socket = io('http://0.0.0.0:5001');

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      navigate('login');
    }
  });

  useEffect(() => {
    dispatch(fetchChannels(token));
  }, [token, dispatch]);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    })

    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    })
  }, [socket, dispatch]);

  const sendMessage = (messageText) => {
    socket.emit('newMessage', {body: messageText, channelId: channelsState.currentChannelId, username}, response => {
      console.log(response.status);
    })
  }

  const createChannel = (e) => {
    e.preventDefault();
    if(Object.values(channelsState.entities).some(channel => channel.name === e.target.channelName.value)) {
      alert('Channel with same name already exist');
      return;
    }

    socket.emit('newChannel', {name: e.target.channelName.value}, response => {
      dispatch(toggleChannel(response.data.id));
    })
  };

  const deleteChannel = (id) => {
    socket.emit('removeChannel', {id}, response => {
      dispatch(removeChannel(id));
    })
  };

  const renameChannel = (e, id) => {
    socket.emit('renameChannel', {id, name: e.target.channelName.value}, (response) => {
      console.log(response);
    })
  };

  console.log(messages);

  return (
    <Container fluid>
      <Row>
        <Col sm={2}>
          <Button onClick={() => setShowModal(true)}>
            Add Channel
          </Button>
          <CreateChannelModal handleSubmit={createChannel} show={showModal} setShow={setShowModal} modalName='Create Channel' inputPlaceholder='Channel name'/>
          <Channels renameChannel={renameChannel} removeChannel={deleteChannel} channels={Object.values(channelsState.entities)} currentChannelId={channelsState.currentChannelId}/>
        </Col>
        <Col>      
          <Chat messages={messages.filter((message) => message.channelId === channelsState.currentChannelId)} sendMessage={sendMessage}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Main;