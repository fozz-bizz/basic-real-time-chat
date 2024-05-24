// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

// CORS configuration for Express
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// Create a new instance of Socket.io
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // Handle incoming messages
  socket.on("message", (message) => {
    console.log("Received message:", message);
    // Broadcast the message to all clients
    io.emit("message", message);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
