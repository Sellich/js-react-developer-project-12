import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(!localStorage.getItem('token'), localStorage.getItem('token'));
    if(!localStorage.getItem('token')) {
      console.log('redirect');
      navigate('login');
    }
  });

  return (
    <div>Chat</div>
  )
}

export default Chat;