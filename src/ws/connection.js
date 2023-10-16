import { Message } from '../../db/models';

const activeConnections = new Map();

const connectionCb = (socket, request) => {
  const userId = request.session.user.id;

  activeConnections.set(userId, { ws: socket, user: request.session.user });
  socket.on('error', console.error);

  console.log('Socket has been initiated');

  socket.on('message', async (message) => {
    const fromFront = JSON.parse(message);
    switch (fromFront.type) {
      case 'message':
        {
          // case 1
        }
        break;

      default:
        break;
    }
    // console.log(`Received message ${message} from user ${userId}`);
  });

  socket.on('close', () => {
    activeConnections.delete(userId);
  });
};

export default connectionCb;
