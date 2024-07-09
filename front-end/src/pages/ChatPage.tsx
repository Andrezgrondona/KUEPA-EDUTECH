

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import io from 'socket.io-client';
import Chat from '../components/Chat';

const socket = io('http://localhost:4000'); 

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.emit('join', 'default-room');
    
  
    socket.on('previousMessages', (messages) => {
      setMessages(messages);
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

  
    return () => {
      socket.off('message');
      socket.off('previousMessages');
    };
  }, []);

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-8">
          <iframe
            width="100%"
            height="600"
            src="https://www.youtube.com/embed/wNScop3rq_g"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="col-md-4">
        <h1 className="h3 text-center mb-4">Chat clase  Administracion de Proyectos</h1>
          <div className="chat-container bg-secondary rounded p-3 text-white">
            <Chat messages={messages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;