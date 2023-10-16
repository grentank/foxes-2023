import React, { useState } from 'react';
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import formatInput from '../utils/formatInput';
import PhoneIcon from '../../../ui/icons/PhoneIcon';

export default function FormPhoneNumber({ submitHandler, loading }) {
  const [input, setInput] = useState({
    value: '',
    formatted: '',
    phoneString: '',
  });
  const changeHandler = (event) => {
    const formatted = formatInput(event.target.value);
    setInput({
      value: event.target.value,
      formatted,
      phoneString: formatted.replace(/[^0-9]/g, ''),
    });
  };
  return (
    <Form onSubmit={(event) => submitHandler(event, input)}>
      <InputGroup size="lg" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-lg">+7</InputGroup.Text>
        <FloatingLabel label="Номер телефона">
          <Form.Control
            size="lg"
            type="text"
            value={input.formatted}
            onChange={changeHandler}
            placeholder="(987) 654-32-10"
            aria-label="Phone number"
            aria-describedby="inputGroup-sizing-lg"
            id="phoneinputid"
            disabled={loading}
          />
        </FloatingLabel>
        <InputGroup.Text>
          <Button variant="outline-primary" type="submit">
            <PhoneIcon />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
