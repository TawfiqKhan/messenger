// import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";
import { setActiveChat } from "../../store/activeConversation";
import { updateMessages } from "../../store/utils/thunkCreators";
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
    "&:hover": {
      cursor: "grab",
    },
  },
  badge: {
    marginRight: 25,
    "& span": {
      fontWeight: 600,
      padding: 7,
    },
  },
};

// show unread message count
// during adding a message to db, check if receiver is online, if not unread status false
// if online but conversation is not active chat then unread status false

function Chat(props) {
  const [totalUnread, setTotalUnread] = useState(0);

  const { classes, user } = props;
  const { otherUser, messages } = props.conversation;

  useEffect(() => {
    const unreadMessages = messages.filter(
      (message) =>
        message.senderId !== props.user.id && !message.receiverHasRead
    );
    setTotalUnread(unreadMessages.length);
  });

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    // if it is not a new conversation, only then send update request
    if (conversation.id) {
      const unreadMessageIds = messages
        .filter(
          (message) => message.senderId !== user.id && !message.receiverHasRead
        )
        .map((message) => message.id);

      await props.updateMessages(
        unreadMessageIds,
        user.id,
        conversation.id,
        otherUser.id
      );
      socket.emit("update-messages", {
        convoId: conversation.id,
        otherUserId: otherUser.id,
      });
      setTotalUnread(0);
    }
  };

  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={props.conversation}
        totalUnread={totalUnread}
      />
      <Badge
        className={classes.badge}
        badgeContent={totalUnread}
        color="primary"
      ></Badge>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    updateMessages: (messageIds, userId, convoId, otherUserId) => {
      dispatch(updateMessages(messageIds, userId, convoId, otherUserId));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
