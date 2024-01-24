// ChatWidget.js
import React, { useState } from "react";
import "../../styles/chat/ChatWidget.css";
import SocketChat from "../chat/SocketChat.js";

const ChatWidget = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => {
    setIsChatVisible((prev) => !prev);
  };

  const closeChat = () => {
    setIsChatVisible(false);
  };

  return (
    <div className={`chat-widget ${isChatVisible ? "visible" : ""}`}>
      {isChatVisible ? (
        <SocketChat onClose={closeChat} />
      ) : (
        <div className="icon" onClick={toggleChat}>
          <img src="assets/etc/chat.png" alt="Chat Icon" />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
