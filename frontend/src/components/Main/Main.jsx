import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import {channelsSelectors, fetchChannels} from '../../slices/channelsSlice';
import { messagesSelectors } from '../../slices/messagesSlice';
import Channels from './Channels';
import Chat from './Chat';
import { Col, Container, Row } from 'react-bootstrap';


const Main = () => {
  const navigate = useNavigate();
  const {token} = useContext(UserContext);
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      navigate('login');
    }
  });

  useEffect(() => {
    dispatch(fetchChannels(token));
  }, [token, dispatch]);

  console.log(messages, channels);

  return (
    <Container fluid>
      <Row>
        <Col sm={2}>
          <Channels channels={channels}/>
        </Col>
        <Col>      
          <Chat messages={messages}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Main;