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

// Add two new column in the conversations
// use useEffect to update user1lastRead and user2lastread to their last messages
// Show the icon of read for the last read message
// later compare total messages to last read message. total unread will be the difference between their index value

function Chat(props) {
  useEffect(() => {
    // console.log("From useEffect", props.conversation);
    axios
      .post("/api/conversations/new", { id: props.conversation.id })
      .then((data) => console.log("line 32", data.data));
  }, []);

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
  };

  console.log(props.conversation.messages.length);
  const { classes } = props;
  const otherUser = props.conversation.otherUser;
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
