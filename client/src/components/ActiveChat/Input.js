import React, { Component } from "react";
import { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage, getRecipientData } from "../../store/utils/thunkCreators";
import socket from "../../socket";
import axios from "axios";

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
};

function Input(props) {
  const [text, setText] = useState("");
  const { classes, otherUser } = props;

  const handleChange = async (event) => {
    const { value } = event.target;
    setText(value);

    const reqBody = {
      recipientId: props.otherUser.id,
      conversationId: props.conversationId,
      sender: props.conversationId ? null : props.user,
    };
    socket.emit("typing-test", { reqBody });
    // await props.showTypingStatus(reqBody);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Emitting message to check if the receivers active conversation is this one
    // first sending to server bin/www
    // socket.emit("sending-message");
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.

    // if other user is not online, save message as unread
    if (!otherUser.online) {
      const reqBody = {
        text: event.target.text.value,
        recipientId: props.otherUser.id,
        conversationId: props.conversationId,
        sender: props.conversationId ? null : props.user,
        receiverHasRead: false,
      };
      await props.postMessage(reqBody);
      setText("");
    } else {
      // Have to try to implement current conv in otheruser section. when someone logout or login othyer user login status gets updated for eveyone
      // Have to try to do that when an user changes his active chat

      // Updating thr state with for other users activeChat
      // Noticed two bugs, during first conversation after searching  a user, typed message are sent to other online users, goes away after refresh
      // if a user reloads a page and dont have any active chat open, their past active chat remains(reset active chat on page load)

      // two condition here, if online and dont have active chat then receiverHasRead = false
      // else if active chat/conv == current convo receiverHasRead = true
      console.log("Line 61----", props.otherUser.id);
      await props.getRecipientData(props.conversationId, props.otherUser.id);
      const reqBody = {
        text: event.target.text.value,
        recipientId: props.otherUser.id,
        conversationId: props.conversationId,
        sender: props.conversationId ? null : props.user,
        receiverHasRead: false,
      };
      await props.postMessage(reqBody);
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
    getRecipientData: (convoId, recipientId) => {
      dispatch(getRecipientData(convoId, recipientId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
