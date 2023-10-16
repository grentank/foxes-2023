import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import UsersList from './ui/UsersList';
import ChatComponent from './ui/ChatComponent';

const initUsers = [{ name: 'Alex' }, { name: 'Bob' }, { name: 'Carl' }];

export default function ChatPage({ messages: initMessages, user: loggedUser }) {
  const [messages, setMessages] = useState(initMessages);
  const [users, setUsers] = useState(initUsers);
  const wsConnect = false;
  
  return (
    <Container>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs={6}>
          <h1 className="p-2 display-3" style={{ color: wsConnect ? 'green' : 'red' }}>
            Chat
          </h1>
          <h1 className="p-2 display-3" style={{ color: wsConnect ? 'green' : 'red' }}>
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
            <ChatComponent messages={messages} loggedUser={loggedUser} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
