import React, { useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import FormPhoneNumber from './ui/FormPhoneNumber';
import FormMessageCode from './ui/FormMessageCode';
import CheckMarkIcon from '../../ui/icons/CheckMarkIcon';
import ErrorModal from './ui/ErrorModal';
import useModal from './hooks/useModal';

export default function AuthPage() {
  const [showForm, setShowForm] = useState(true);
  const [backendData, setBackendData] = useState({
    uuid: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { show, handleClose, content, showModal } = useModal();

  const submitPhoneHandler = async (event, input) => {
    try {
      setLoading(true);
      event.preventDefault();
      const phone = `7${input.phoneString}`;
      const response = await axios.post('/api/auth/sms', { phone });
      if (response.status === 200) {
        setBackendData({ uuid: response.data.uuid, phone });
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const submitCodeHandler = async (code) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/code', { code: code.join(''), ...backendData });
      setSuccess(true);
      setTimeout(() => {
        window.location = response.data.created ? '/profile' : '/chat';
      }, 1000);
    } catch (error) {
      showModal('Error', error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs="8">
          {showForm ? (
            <h1 className="display-5 p-2">Войти</h1>
          ) : (
            <h1 className="display-5">Введите код из смс</h1>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs="7">
          {showForm ? (
            <FormPhoneNumber submitHandler={submitPhoneHandler} loading={loading} />
          ) : (
            <FormMessageCode submitCodeHandler={submitCodeHandler} loading={loading} />
          )}
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs="4">
          {success ? <CheckMarkIcon /> : <Spinner animation="border" size="lg" hidden={!loading} />}
        </Col>
      </Row>
      <ErrorModal content={content} show={show} handleClose={handleClose} />
    </Container>
  );
}
