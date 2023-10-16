import React from 'react';
import { Stack } from 'react-bootstrap';
import ChatMessage from './ChatMessage';

export default function MessagesList({ messages, loggedUser }) {
  return (
    <div className="overflow-y-scroll" style={{ height: '23rem' }}>
      <Stack>
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id} loggedUser={loggedUser} />
        ))}
      </Stack>
    </div>
  );
}
