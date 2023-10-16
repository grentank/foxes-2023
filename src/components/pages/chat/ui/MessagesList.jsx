import React, { useEffect, useRef } from 'react';
import { Stack } from 'react-bootstrap';
import ChatMessage from './ChatMessage';

export default function MessagesList({ messages, loggedUser, editMessageHandler }) {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [messages]);
  return (
    <div ref={divRef} className="overflow-y-scroll" style={{ height: '23rem' }}>
      <Stack>
        {messages.map((message) => (
          <ChatMessage editMessageHandler={editMessageHandler} message={message} key={message.id} loggedUser={loggedUser} />
        ))}
      </Stack>
    </div>
  );
}
