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
    const reqBody = {
      text: event.target.text.value,
      recipientId: props.otherUser.id,
      conversationId: props.conversationId,
      sender: props.conversationId ? null : props.user,
    };
    // if other user is not online, save message as unread
    if (!otherUser.online) {
      let body = { ...reqBody, receiverHasRead: false };
      await props.postMessage(body);
      setText("");
    } else {
      // get recivers active conversation and set the reciverHasRead status based on that
      const receiver = await axios.post("/api/conversations/getReceiver", {
        userId: otherUser.id,
      });
      if (receiver.data.activeConv === props.conversationId) {
        let body = { ...reqBody, receiverHasRead: true };
        await props.postMessage(body);
        setText("");
      } else {
        let body = { ...reqBody, receiverHasRead: false };
        await props.postMessage(body);
        setText("");
      }
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
