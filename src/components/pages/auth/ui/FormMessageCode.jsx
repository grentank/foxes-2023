import React, { createRef, useEffect, useState } from 'react';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

export default function FormMessageCode({ submitCodeHandler, loading }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [inputRefs, setInputRefs] = useState([]);

  const changeHandler = (e, index) => {
    setCode((prev) => prev.map((char, i) => (i === index ? e.target.value.slice(0, 1) : char)));
    if (e.target.value === '') return;
    if (code[index + 1] === '') {
      inputRefs[index + 1].current.focus();
    }
  };

  useEffect(() => {
    setInputRefs((prev) =>
      Array(4)
        .fill()
        .map((_, i) => prev[i] || createRef()),
    );
  }, []);

  useEffect(() => {
    if (inputRefs[0]) inputRefs[0].current.focus();
  }, [inputRefs]);

  useEffect(() => {
    if (code.every((char) => char !== '')) {
      submitCodeHandler(code);
    }
  }, [code]);
  return (
    <Container>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs="6">
          <Form>
            <InputGroup className="mb-3" size="lg" style={{ width: '200px' }}>
              {code.map((char, index) => (
                <Form.Control
                  key={index}
                  ref={inputRefs[index]}
                  value={code[index]}
                  onChange={(e) => changeHandler(e, index)}
                  disabled={loading}
                />
              ))}
            </InputGroup>
          </Form>
        </Col>
      </Row>
      {/* <div className="d-flex justify-content-center align-items-center flex-column"> */}
    </Container>
  );
}
