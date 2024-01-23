import "../src/styles/SocketChat.css";
import React, { useEffect, useState } from "react";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8081/socket");

    newSocket.onopen = (event) => {
      console.log("WebSocket 연결이 열렸습니다.");
    };

    newSocket.onmessage = (event) => {
      const receivedMessage = event.data;
      console.log("서버로부터 메시지 수신:", receivedMessage);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket 연결이 닫혔습니다.");
    };

    setSocket(newSocket);

    // 컴포넌트가 언마운트되면 WebSocket 연결을 종료
    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (
      inputMessage.trim() !== "" &&
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      const message = inputMessage;
      console.log("클라이언트에서 서버로 메시지 전송:", message);
      socket.send(message);
      console.log(message);
      setInputMessage("");
    } else {
      console.error("WebSocket이 열려 있지 않거나 'socket'이 'null'입니다.");
    }
  };

  const handleKeyPress = (event) => {
    // Enter 키가 눌렸을 때 sendMessage 호출
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // 채팅창 스크롤 때 글올라오면 아래로 스크롤
  useEffect(() => {
    const messageContainer = document.querySelector(".message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messageBox">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>

      <div className="text-box">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatComponent;
