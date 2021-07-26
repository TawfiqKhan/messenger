import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { updateMessages } from "../../store/utils/thunkCreators";
import socket from "../../socket";
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
}));

// once a chat is active, have a useEffect sent request to backebnd to update all the messages where user is not the sender to read
// lets first get all the messages where user is not sender

const ActiveChat = (props) => {
  const [conversationId, setConversationId] = useState(null);
  const [lastReadMessage, setLastReadMessage] = useState({
    id: 30,
    text: " Hello",
  });
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};
  const { messages } = conversation;

  // useEffect(() => {
  //   // setConversationId(conversation.id);
  //   socket.on("update-messages", (convoId) => {
  //     console.log(convoId);
  //     console.log("Line 45----", conversation.id);
  //     // console.log("Messages", conversation.messages);
  //   });
  // }, []);
  // console.log("Line 45----", conversation.id);

  //if online do somethind
  // if online and has active convo
  // if not online or no active convo

  useEffect(() => {
    // socket.on("update-messages", (convoId) => {
    //   setTimeout(() => {
    //     console.log("Getting return emit---", convoId.convoId);
    //     console.log("conversation-----", conversationId);
    //     if (convoId.convoId === conversation.id) {
    //       const lastMessage = conversation.messages.filter((message) => {
    //         return message.senderId === user.id;
    //       });
    //       console.log("Last message-----", lastMessage);
    //       setLastReadMessage(lastMessage[lastMessage.length - 1]);
    //     }
    //   }, 1000);
    // });
    // console.log("Running----");
    if (messages) {
      (async () => {
        const receiver = await axios.post("/api/conversations/getReceiver", {
          userId: conversation.otherUser.id,
        });
        if (
          receiver.data.online &&
          receiver.data.activeConvo &&
          receiver.data.activeConvo === conversation.id
        ) {
          const lastMessage = conversation.messages.filter((message) => {
            return message.senderId === user.id;
          });
          // console.log("Last message-----", lastMessage);
          setLastReadMessage(lastMessage[lastMessage.length - 1]);
        } else {
          const lastMessage = messages.filter(
            (message) => message.senderId === user.id && message.receiverHasRead
          );
          setLastReadMessage(lastMessage[lastMessage.length - 1]);
        }
      })();
    }
  });

  useEffect(() => {
    // console.log("Running once----");
    console.log("Line 95-----", conversationId);
    const updateReceivedMessages = async () => {
      if (messages) {
        const receivedMessages = messages
          .filter(
            (message) =>
              message.senderId !== user.id && !message.receiverHasRead
          )
          .map((message) => message.id);
        console.log("line 76----", conversation.id);
        await props.updateMessages(receivedMessages, conversation.id);
        socket.emit("update-messages", { convoId: conversation.id });
      }
    };
    updateReceivedMessages();
  }, [conversation.id]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              isTyping={conversation.isTyping || null}
              otherUser={conversation.otherUser}
              userId={user.id}
              lastMessage={lastReadMessage}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (messages, convoId) => {
      dispatch(updateMessages(messages, convoId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
