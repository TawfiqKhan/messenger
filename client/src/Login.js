import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import useStyles from "./useStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
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
      <Grid
        item
        xs={12}
        sm={5}
        md={6}
        elevation={6}
        component={Paper}
        square
        className={classes.imageContainer}
      >
        <img src={img} alt="" className={classes.introImage} />
        <Typography className={classes.introText}>
          <FontAwesomeIcon icon={faComments} />
          Converse with anyone in any language
        </Typography>
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
                color="primary"
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
