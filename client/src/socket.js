import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setTypingStatus,
  addOtherUserActiveChat,
  updateMessagesReadStatus,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  // This listener is for reciver client, who will update their state with the new message`
  socket.on("new-message", (data) => {
    console.log("From new message-------", data);
    store.dispatch(setNewMessage(data.message, data.sender));
  });

  socket.on("sending-message", (data) => {
    //client receiving emit, now need to get check state and send back user conversations status
    // Or we can save user current conversation in server
    console.log("Line 33-------", data);
    // socket.emit("return-message", { info: "coming back" });
    // store.dispatch(setRecipeintActiveConv(data.recipient, data.convoId));
  });

  socket.on("update-active-chat", (data) => {
    console.log("I am here---");
    console.log("from client socket", data);
    store.dispatch(addOtherUserActiveChat(data.convoId, data));
  });

  socket.on("update-messages", (convoId) => {
    console.log("Getting return emit---", convoId);
    store.dispatch(updateMessagesReadStatus(convoId));
  });

  socket.on("typing-test", (data) => {
    store.dispatch(setTypingStatus(data.body.reqBody, true));
    setTimeout(() => {
      store.dispatch(setTypingStatus(data.body.reqBody, false));
    }, 1000);
  });
});

export default socket;
