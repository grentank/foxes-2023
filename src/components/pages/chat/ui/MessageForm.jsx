import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import SendIcon from '../../../ui/icons/SendIcon';

export default function MessageForm({ sendMessageHandler }) {
  const [message, setMessage] = useState('');
  const handleChange = (e) => setMessage(e.target.value);
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        sendMessageHandler(message);
        setMessage('');
      }}
    >
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={message}
          onChange={handleChange}
        />
        <InputGroup.Text id="basic-addon2">
          <Button variant="outline-primary" type="submit">
            <SendIcon />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
