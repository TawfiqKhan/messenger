// import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import socket from "../../socket";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&:hover": {
      cursor: "grab",
    },
  },
};

// show unread message count
// during adding a message to db, check if receiver is online, if not unread status false
// if online but conversation is not active chat then unread status false

function Chat(props) {
  const [totalUnread, setTotalUnread] = useState(5);
  useEffect(() => {
    const unreadMessages = messages.filter(
      (message) =>
        message.senderId !== props.user.id && !message.receiverHasRead
    );
    setTotalUnread(unreadMessages.length);
  });
  const handleClick = async (conversation) => {
    await axios.post("/auth/user/edit", {
      userId: props.user.id,
      convoId: conversation.id,
    });
    await props.setActiveChat(conversation.otherUser.username);

    setTotalUnread(0);
  };

  const { otherUser, messages } = props.conversation;

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
      <ChatContent conversation={props.conversation} />
      {/* <div>{`${totalUnread(messages)}`}</div> */}
      <Badge badgeContent={totalUnread} color="primary"></Badge>
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
