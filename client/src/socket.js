import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setTypingStatus,
  updateMessagesReadStatus,
} from "./store/conversations";

const token = window.localStorage.getItem("messenger-token") || "Hello";

const socket = io.connect(window.location.origin, {
  query: null,
  autoConnect: false,
});
socket.on("connect", () => {
  console.log("connected to server");
});
socket.on("add-online-user", (id) => {
  store.dispatch(addOnlineUser(id));
});

socket.on("remove-offline-user", (id) => {
  store.dispatch(removeOfflineUser(id));
});

// This listener is for reciver client, who will update their state with the new message`
socket.on("new-message", async (data) => {
  store.dispatch(setNewMessage(data.message, data.sender, data.recipient));
});

socket.on("update-messages", ({ convoId, otherUserId }) => {
  store.dispatch(updateMessagesReadStatus(convoId));
});

socket.on("started-typing", ({ body }) => {
  store.dispatch(setTypingStatus(body, true));
  setTimeout(() => {
    store.dispatch(setTypingStatus(body, false));
  }, 1000);
});

socket.on("authenticated", (data) => {
  console.log(`Autheticated!!!!`);
});
socket.on("unauthorized", (msg) => {
  console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
  throw new Error(msg.data.type);
});

// Handling token expiration
socket.on("connect_error", (error) => {
  console.log("error----", error);
});
socket.on("messages", (data) => {
  console.log(data);
});

export default socket;
