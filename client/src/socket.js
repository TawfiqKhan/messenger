import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setTypingStatus,
  updateMessagesReadStatus,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");
  const user = store.getState().user;

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  // This listener is for reciver client, who will update their state with the new message`
  socket.on("new-message", async (data) => {
    // if the message is for the user only then call the dispatch
    if (user.id === data.recipient) {
      store.dispatch(setNewMessage(data.message, data.sender, data.recipient));
    }
  });

  socket.on("update-messages", ({ convoId, otherUserId }) => {
    console.log("first log");
    console.log("now sender needs to update-----", convoId, otherUserId);
    // console.log("user----", user.id);
    // console.log("otherUser----", otherUserId);
    if (user.id === otherUserId) {
      store.dispatch(updateMessagesReadStatus(convoId));
    }
    // store.dispatch(updateMessagesReadStatus(convoId));
  });

  socket.on("started-typing", ({ body }) => {
    // check if the message is intended for the user, only then show typing status
    if (user.id === body.recipientId) {
      store.dispatch(setTypingStatus(body, true));
      setTimeout(() => {
        store.dispatch(setTypingStatus(body, false));
      }, 1000);
    }
  });
});

export default socket;
