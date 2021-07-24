import React, { Component } from "react";
import { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import socket from "../../socket";

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

  // handleKeydown = async (event) => {
  //   console.log("I am happening");
  //   const reqBody = {
  //     recipientId: props.otherUser.id,
  //     conversationId: props.conversationId,
  //     sender: props.conversationId ? null : props.user,
  //   };
  //   await props.showTypingStatus(reqBody);
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: props.otherUser.id,
      conversationId: props.conversationId,
      sender: props.conversationId ? null : props.user,
    };
    await props.postMessage(reqBody);
    this.setState({
      text: "",
    });
  };

  const { classes, otherUser } = props;
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
