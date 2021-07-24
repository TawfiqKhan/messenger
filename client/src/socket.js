import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setTypingStatus,
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

  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });

  socket.on("typing-test", (data) => {
    console.log("Line 25 data.reqBody", data.body);
    store.dispatch(setTypingStatus(data.body.reqBody, true));
    setTimeout(() => {
      store.dispatch(setTypingStatus(data.body.reqBody, false));
    }, 1000);
  });
});

export default socket;
