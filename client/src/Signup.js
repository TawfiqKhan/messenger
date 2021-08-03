import React, { useState } from "react";
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
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
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
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
            linkTo="/login"
            asideText="Have an account?"
            btnText="Login"
          />
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography
                  className={classes.welcome}
                  component="h1"
                  variant="h5"
                >
                  Create an account!
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={handleRegister} className={classes.form}>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  fullWidth
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className={classes.submit}
              >
                Register
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
