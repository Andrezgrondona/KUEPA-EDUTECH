import { Server, Socket } from 'socket.io';

export const socketHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected');

    socket.on('join', (room: string) => {
      socket.join(room);
      console.log(`Client joined room ${room}`);
    });

    socket.on('message', (message: any) => {
      io.to(message.room).emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
