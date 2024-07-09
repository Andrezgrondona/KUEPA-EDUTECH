
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
  },
});

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
}));


mongoose.connect('mongodb://localhost:27017/chat', {
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  room: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

app.get('/', (req, res) => {
  res.send('Server is running');
});



io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
    
  
    Message.find({ room }).then((messages) => {
      socket.emit('previousMessages', messages);
    });
  });

  socket.on('message', (message) => {
    const newMessage = new Message(message);
    newMessage.save().then(() => {
      io.to(message.room).emit('message', message);
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
