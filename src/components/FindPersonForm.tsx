import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import type { AsyncSubmitHandler } from '../types/handlers';

type FindPersonFormProps = {
  submitHandler: AsyncSubmitHandler;
};

export default function FindPersonForm({
  submitHandler,
}: FindPersonFormProps): JSX.Element {
  const [input, setInput] = useState('');
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput(e.target.value);
  return (
    <Form
      onSubmit={(e) => {
        if (!input.includes(',')) return;
        void submitHandler(e);
      }}
    >
      <InputGroup className="mb-3">
        <Form.Control
          onChange={changeHandler}
          value={input}
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="personids"
          isValid={input.includes(',') && input.length > 0}
          isInvalid={!input.includes(',') && input.length > 0}
        />
        <InputGroup.Text id="basic-addon2">
          <Button type="submit">search</Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
