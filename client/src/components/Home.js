import { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";
import axios from "axios";

const styles = {
  root: {
    height: "97vh",
  },
};

const Home = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(props.user.id ? true : false);

  useEffect(() => {
    if (props.user) {
      setIsLoggedIn(true);
    }
    if (isLoggedIn) {
      axios.post("/api/users/edit", {
        userId: props.user.id,
        convoId: 0,
      });
    }
    props.fetchConversations();
  }, []);

  const handleLogout = async () => {
    await props.logout(props.user.id);
  };
  const { classes } = props;
  if (!props.user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }
  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer user={props.user} />
        <ActiveChat />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
