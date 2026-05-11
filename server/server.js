const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
// ... existing imports ...
const authRoutes = require('./routes/authRoutes');

// ... after app.use(express.json()); ...
app.use('/api/auth', authRoutes);

app.use(cors());
app.use(express.json());

// Socket.io Real-time Logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join_project', (projectId) => {
    socket.join(projectId);
  });

  socket.on('update_task', (data) => {
    // Broadcast update to everyone in the project room
    socket.to(data.projectId).emit('task_updated', data);
  });
});

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // 5 seconds mein fail ho jaye agar connect na ho
})
.then(() => console.log("✅ MongoDB Connected!"))
.catch(err => console.log("❌ Connection Error:", err.message));
 