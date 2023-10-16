import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Container, Stack } from 'react-bootstrap';
import axios from 'axios';
import EditIcon from '../../ui/icons/EditIcon';
import CircleCheckIcon from '../../ui/icons/CircleCheckIcon';

export default function ProfilePage({ user }) {
  const [isEditing, setIsEditing] = useState({ email: false, name: false });
  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name,
    phone: user.phone,
  });
  const changeHandler = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const editHandler = (key) => setIsEditing((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    if (
      (!isEditing.email || !isEditing.name) &&
      (formData.email !== user.email || formData.name !== user.name)
    ) {
      axios
        .patch(`/api/users/${user.id}`, {
          email: formData.email,
          name: formData.name,
        })
        .then((res) => setFormData(res.data))
        .catch(console.log);
    }
  }, [isEditing]);

  return (
    <Container>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs={6}>
          <h1 className="p-2 display-3">Профиль</h1>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col xs={7} className="border border-primary-subtle rounded mt-5">
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhone">
              <Form.Label column sm="3">
                Телефон
              </Form.Label>
              <Col sm="8">
                <Form.Control plaintext readOnly defaultValue={formData.phone} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  plaintext={!isEditing.email}
                  readOnly={!isEditing.email}
                  value={formData.email}
                  onChange={changeHandler}
                />
              </Col>
              <Col sm="2">
                <Button
                  onClick={() => editHandler('email')}
                  variant={isEditing.email ? 'success' : 'primary'}
                >
                  {isEditing.email ? <CircleCheckIcon /> : <EditIcon />}
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
              <Form.Label column sm="3">
                Имя
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Имя"
                  plaintext={!isEditing.name}
                  readOnly={!isEditing.name}
                  value={formData.name}
                  onChange={changeHandler}
                />
              </Col>
              <Col sm="2">
                <Button
                  onClick={() => editHandler('name')}
                  variant={isEditing.name ? 'success' : 'primary'}
                >
                  {isEditing.name ? <CircleCheckIcon /> : <EditIcon />}
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
