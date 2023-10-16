import { Message, User } from '../../db/models';
import { ADD_POST, CREATE_POST, EDIT_POST, SET_USERS, UPDATE_POST } from './wsActions';

const activeConnections = new Map();

const connectionCb = (socket, request) => {
  const userId = request.session.user.id;

  activeConnections.set(userId, { ws: socket, user: request.session.user });
  socket.on('error', console.error);

  activeConnections.forEach(({ ws }) => {
    const activeUsers = Array.from(activeConnections.values()).map(({ user }) => user);
    const action = { type: SET_USERS, payload: activeUsers };
    ws.send(JSON.stringify(action));
  });

  socket.on('message', async (message) => {
    const actionFromFront = JSON.parse(message);
    const { type, payload } = actionFromFront;
    switch (type) {
      case CREATE_POST:
        {
          const newPost = await Message.create({ text: payload, authorId: userId });
          const postWithAuthor = await Message.findOne({
            where: { id: newPost.id },
            include: User,
          });
          const action = { type: ADD_POST, payload: postWithAuthor };
          activeConnections.forEach(({ ws }) => ws.send(JSON.stringify(action)));
        }
        break;
      case EDIT_POST:
        {
          const { id, text } = payload;
          const editedPost = await Message.findOne({ where: { id }, include: User });
          editedPost.text = text;
          await editedPost.save();
          const action = { type: UPDATE_POST, payload: editedPost };
          activeConnections.forEach(({ ws }) => ws.send(JSON.stringify(action)));
        }

        break;

      default:
        break;
    }
    // console.log(`Received message ${message} from user ${userId}`);
  });

  socket.on('close', () => {
    activeConnections.delete(userId);
    activeConnections.forEach(({ ws }) => {
      const activeUsers = Array.from(activeConnections.values()).map(({ user }) => user);
      const action = { type: SET_USERS, payload: activeUsers };
      ws.send(JSON.stringify(action));
    });
  });
};

export default connectionCb;
