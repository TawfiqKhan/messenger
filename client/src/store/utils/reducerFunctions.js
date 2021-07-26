import { updateMessages } from "./thunkCreators";

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }
  console.log("state:::::", state);
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const updateMessagesInStore = (state, { messages, convoId }) => {
  console.log("Convoid::::", convoId);
  return state.map((convo) => {
    if (convo.id === convoId) {
      console.log("found-----", convo.id);
      const convoCopy = { ...convo };
      const updatedMessages = convoCopy.messages.map((message) => {
        console.log(
          "sender---::",
          message.senderId,
          "OtherUser::",
          convoCopy.otherUser.id,
          "read stat:::",
          message.receiverHasRead
        );
        if (
          message.senderId === convoCopy.otherUser.id &&
          !message.receiverHasRead
        ) {
          console.log("Inside IF----Returning", {
            ...message,
            receiverHasRead: true,
          });
          return { ...message, receiverHasRead: true };
        } else {
          console.log("From Else----");
          return message;
        }
      });
      convoCopy.messages = updatedMessages;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addTypingStatus = (state, payload) => {
  const { conversation, isTyping } = payload;
  return state.map((convo) => {
    if (convo.id === conversation.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.isTyping = isTyping;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOtherUserActiveChatToStore = (state, payload) => {
  const { convoId, recipientData } = payload;
  console.log("line 42---------------", recipientData);
  return state.map((convo) => {
    if (convo.id === convoId) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = {
        ...convo.otherUser,
        activeConvo: recipientData.convoId || null,
      };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  console.log("State:::::::", state, "id:::::", id);
  return state.map((convo) => {
    console.log("Here-----");
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      convoCopy.otherUser.testing = "Yes";
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};
