const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const PORT = 4000;
const path = require("path")
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // connecting the socket with front end
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected  : ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    // get retailer id which we wanna receive message of
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("send_message_from_brand", (data) => {
    socket.broadcast.emit("received_message_from_brand", data);
  });

  socket.on("send_message_to_room", (data) => {
    socket.to(data.room).emit("received_From_room", data);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    console.log({
      listening: true,
      server: "inrunning status",
    });
    res.send({ status: true });
  });
}

server.listen(3001, () => {
  console.log("server listenig successfully..");
});


