import React from 'react';
import { Stack } from 'react-bootstrap';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';

export default function ChatComponent({ messages, editMessageHandler, loggedUser, sendMessageHandler }) {
  const writes = false;
  return (
    <Stack>
      <MessagesList editMessageHandler={editMessageHandler} messages={messages} loggedUser={loggedUser} />
      <div className="fs-6 fw-light">{writes ? 'Alex печатает...' : `\xa0`}</div>
      <MessageForm sendMessageHandler={sendMessageHandler} />
    </Stack>
  );
}
