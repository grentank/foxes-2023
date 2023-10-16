import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import UsersList from './ui/UsersList';
import ChatComponent from './ui/ChatComponent';
import { ADD_POST, CREATE_POST, EDIT_POST, SET_USERS, UPDATE_POST } from './wsActions';

export default function ChatPage({ messages: initMessages, user: loggedUser }) {
  const [messages, setMessages] = useState(initMessages);
  const [users, setUsers] = useState([]);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    function initSocket() {
      const socket = new WebSocket('ws://localhost:3000');
      socketRef.current = socket;
      socket.onopen = () => setIsWsConnected(true);
      socket.onclose = () => {
        setIsWsConnected(false);
        setTimeout(initSocket, 3000);
      }
      socket.onerror = console.error;
      socket.onmessage = (message) => {
        const actionFromServer = JSON.parse(message.data);
        const { type, payload } = actionFromServer;
        switch (type) {
          case SET_USERS:
            setUsers(payload);
            break;
          case ADD_POST:
            setMessages((prev) => [...prev, payload]);
            break;
          case UPDATE_POST:
            setMessages((prev) => prev.map((post) => (post.id === payload.id ? payload : post)));
            break;
          default:
            break;
        }
      };
    }

    initSocket();
  }, []);

  const sendMessageHandler = (input) => {
    if (!socketRef.current) return;

    const action = { type: CREATE_POST, payload: input };
    socketRef.current.send(JSON.stringify(action));
  };

  const editMessageHandler = (input, postId) => {
    if (!socketRef.current) return;

    const action = { type: EDIT_POST, payload: { id: postId, text: input } };
    socketRef.current.send(JSON.stringify(action));
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs={6}>
          <h1 className="p-2 display-3" style={{ color: isWsConnected ? 'green' : 'red' }}>
            Chat
          </h1>
        </Col>
      </Row>
      <Card className="p-4">
        <Row>
          <Col xs={2}>
            <UsersList users={users} />
          </Col>
          <Col xs={10}>
            <ChatComponent
              editMessageHandler={editMessageHandler}
              sendMessageHandler={sendMessageHandler}
              messages={messages}
              loggedUser={loggedUser}
            />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
