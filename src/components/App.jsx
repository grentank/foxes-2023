import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './ui/NavBar';
import MainPage from './pages/main/MainPage';
import ChatPage from './pages/chat/ChatPage';
import AuthPage from './pages/auth/AuthPage';
import ProfilePage from './pages/profile/ProfilePage';

export default function App({ messages, user }) {
  return (
    <Container>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage messages={messages} user={user} />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
      </Routes>
    </Container>
  );
}
