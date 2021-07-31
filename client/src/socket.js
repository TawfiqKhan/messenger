import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setTypingStatus,
  updateMessagesReadStatus,
} from "./store/conversations";

// setting up conenction for later conenction when user logged in.
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

socket.on("unauthorized", (msg) => {
  throw new Error(msg.data.type);
});

export default socket;
