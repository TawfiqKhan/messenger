import React from "react";
// import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, CircularProgress } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    paddingRight: 10,
    "& svg": {
      color: "#FFFFFF",
    },
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8,
  },
}));

const Messages = (props) => {
  const classes = useStyles();
  const { messages, otherUser, userId, isTyping, lastMessage } = props;
  return (
    <Box>
      {messages
        .sort((a, b) => a.id - b.id)
        .map((message, index) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === userId ? (
            <SenderBubble
              key={message.id}
              id={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
              lastMessage={lastMessage}
            />
          ) : (
            <OtherUserBubble
              key={message.id}
              text={message.text}
              time={time}
              isTyping={isTyping}
              otherUser={otherUser}
            />
          );
        })}
      {isTyping ? (
        <Box className={classes.root}>
          <Avatar
            alt={otherUser.username}
            src={otherUser.photoUrl}
            className={classes.avatar}
          ></Avatar>
          <Box>
            <Box className={classes.bubble}>
              <Typography className={classes.text}>Typing...</Typography>
              <CircularProgress size="1.2rem" />
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default Messages;
