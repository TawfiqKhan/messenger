import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import img from "./images/bg-img.png";
import AuthHeader from "./AuthHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 8,
  },
  authWrapper: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "column",
    minHeight: "100vh",
    paddingTop: 23,
    "& .makeStyles-authHeader-8": {
      justifyContent: "center",
    },
  },
  introImage: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: "#000000",
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    padding: 10,
    width: 160,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: "#3a8dff",
    fontWeight: "bold",
  },
}));

const Login = (props) => {
  const { user, login } = props;
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={5} md={6} elevation={6} component={Paper} square>
        <img src={img} alt="" className={classes.introImage} />
      </Grid>
      <CssBaseline />
      <Grid item xs={12} sm={7} md={6} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <AuthHeader
            linkTo="/register"
            asideText="Don't have an account?"
            btnText="Create account"
          />
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography
                  className={classes.welcome}
                  component="h1"
                  variant="h5"
                >
                  Welcome back!
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={handleLogin} className={classes.form}>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  fullWidth
                  name="username"
                  type="text"
                />
              </FormControl>
              <FormControl margin="normal" required>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                  fullWidth
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
