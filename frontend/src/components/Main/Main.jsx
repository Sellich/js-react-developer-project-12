import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import {channelsSelectors, fetchChannels} from '../../slices/channelsSlice';
import { messagesSelectors } from '../../slices/messagesSlice';
import Channels from './Channels';
import Chat from './Chat';
import { Col, Container, Row } from 'react-bootstrap';
import { io } from "socket.io-client";
import { addMessage } from '../../slices/messagesSlice';


const Main = () => {
  const navigate = useNavigate();
  const {token} = useContext(UserContext);
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
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
  }, [socket, dispatch]);

  const sendMessage = (messageText) => {
    socket.emit('newMessage', {body: messageText, channelId: 1, username: 'admin'}, response => {
      console.log(response.status);
    })
  }

  console.log(messages);

  return (
    <Container fluid>
      <Row>
        <Col sm={2}>
          <Channels channels={channels}/>
        </Col>
        <Col>      
          <Chat messages={messages} sendMessage={sendMessage}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Main;