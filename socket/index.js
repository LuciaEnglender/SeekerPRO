const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// array with my objects users.
let users = [];

// add objects users in the users array
const addUser = (userId, socketId) => {
  console.log("typeof socketId", typeof socketId);
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
  //console.log("user y socket", userId, socketId)
  // !users.some((user) => user.userId === userId) &&
  //     users.push({ userId, socketId });
  // };
};

// remove objects users in the users array
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log(users);
  console.log("user >", userId);
  console.log("type of user >", typeof userId);
  return users.find((user) => user.userId === parseInt(userId, 10));
};

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
    console.log(users);
    console.log("receiver", receiverId);
    console.log("sender", senderId);

    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
