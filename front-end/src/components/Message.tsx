import React from 'react';

interface MessageProps {
  message: any;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="message">
      <strong>{message.user}</strong>: {message.text}
    </div>
  );
};

export default Message;
