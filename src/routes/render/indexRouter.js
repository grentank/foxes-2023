import express from 'express';
import { Message, User } from '../../../db/models';
import authCheck from '../../middlewares/authCheck';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('Layout');
});

router.get('/chat', authCheck(true), async (req, res) => {
  const messages = await Message.findAll({ include: User });
  res.render('Layout', { messages });
});

router.get('/auth', authCheck(false), async (req, res) => {
  res.render('Layout');
});

router.get('/profile', authCheck(true), async (req, res) => {
  res.render('Layout');
});

export default router;
