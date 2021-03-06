import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 14,
    letterSpacing: -0.17,
    fontWeight: 600,
  },

  readText: {
    color: "#93948e",
    letterSpacing: -0.17,
    fontWeight: 600,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, isTyping } = conversation;
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            !props.totalUnread ? classes.readText : classes.previewText
          }
        >
          {isTyping ? "typing..." : latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
