import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

export default function ChatMessage({ message, loggedUser, editMessageHandler }) {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(message.text);
  const justifyContent =
    loggedUser.id === message.User.id ? 'justify-content-end' : 'justify-content-start';
  const handleDoubleClick = (event) => {
    if (event.detail !== 2) return;
    if (message.authorId !== loggedUser.id) return;
    setIsEditing(true);
  };
  return (
    <div className={`d-flex ${justifyContent}`}>
      <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{message.User.name}</Card.Subtitle>
          {isEditing ? (
            <>
              <Form.Control
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <Button
                variant="primary"
                onClick={() => {
                  editMessageHandler(input, message.id);
                  setIsEditing(false);
                }}
              >
                Save
              </Button>
            </>
          ) : (
            <Card.Text onClick={handleDoubleClick}>{message.text}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
