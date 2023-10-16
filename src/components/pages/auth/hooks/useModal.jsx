import { useState } from 'react';

export default function useModal() {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState({
    title: '',
    body: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleToggle = () => setShow((prev) => !prev);
  const showModal = (title, body) => {
    setShow(true);
    setContent({ title, body });
  };
  return { show, content, showModal, handleClose, handleShow, handleToggle };
}
