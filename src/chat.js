const { Server } = require("socket.io");

// array with my objects users.
let users = [];

// add objects users in the users array
const addUser = (userId, socketId) => {
  const userIndex = users.findIndex((user) => user.userId === userId);
  if (userIndex >= 0) {
    users = [
      ...users.slice(0, userIndex),
      { userId, socketId },
      ...users.slice(userIndex + 1, users.length),
    ];
    return;
  }
  users.push({ userId, socketId });
};

// remove objects users in the users array
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) =>
  users.find((user) => user.userId === parseInt(userId, 10));

const initSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    //when connect, take userId and socketId from user
    console.log("a user connected.");
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      //console.log("user y socket.id", userId, socket.id)
      io.emit("getUsers", users);
    });

    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    //when disconnect
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};

module.exports = initSocket;
