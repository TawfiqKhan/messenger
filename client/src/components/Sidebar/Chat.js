// import React, { Component } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

// show unread message count
// during adding a message to db, check if receiver is online, if not unread status false
// if online but conversation is not active chat then unread status false

function Chat(props) {
  //   useEffect(() => {
  //     // console.log("From useEffect", props.conversation);
  //     axios
  //       .post("/api/conversations/new", { id: props.conversation.id })
  //       .then((data) => console.log("line 32", data.data));
  //   }, []);

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
  };

  const { otherUser, messages } = props.conversation;

  console.log("line 42----", otherUser);
  function totalUnread(messages) {
    const unreadMessages = messages.filter(
      (message) => message.receiverHasRead === false
    );
    console.log(messages);
    return unreadMessages.length;
  }
  // console.log("Line 42---", props.conversation);
  const { classes } = props;
  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        // username={`${otherUser.username}---H`}
        online={otherUser.online}
        sidebar={true}
      />
      <div>{`Hi ${totalUnread(messages)}`}</div>
      <ChatContent conversation={props.conversation} />
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
