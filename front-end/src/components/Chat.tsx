import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

interface Message {
  user: string;
  text: string;
}

interface ChatProps {
  messages: Message[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const message = { user: user as string, text: newMessage };
      socket.emit("message", { ...message, room: "default-room" });
      setNewMessage("");
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.user === user ? "my-message" : "other-message"
            } border border-dark bg-info text-dark p-2 rounded mb-2`}
          >
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>

      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
