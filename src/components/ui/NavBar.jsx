import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import ChatQuotesIcon from './icons/ChatQuotesIcon';

export default function NavBar({ user }) {
  const location = useLocation();
  const navigation = [
    {
      active: location.pathname === '/',
      href: '/',
      text: 'Главная',
      hidden: false,
    },
    {
      active: location.pathname === '/chat',
      href: '/chat',
      text: 'Чат',
      hidden: !user,
    },
    {
      active: location.pathname === '/auth',
      href: '/auth',
      text: 'Вход',
      hidden: user,
    },
    {
      active: location.pathname === '/profile',
      href: '/profile',
      text: 'Профиль',
      hidden: !user,
    },
    {
      active: false,
      href: '/api/auth/logout',
      text: 'Выйти',
      hidden: !user,
    },
  ];
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">
          <ChatQuotesIcon />
        </Navbar.Brand>
        <Nav className="me-auto" defaultActiveKey="/" variant="pills">
          {navigation.map(({ active, href, text, hidden }) => (
            <Nav.Link hidden={hidden} key={href} active={active} href={href} eventKey={href}>
              {text}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}
