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

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: "#000000",
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },
}));

const Login = (props) => {
  const history = useHistory();
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
    // <Grid container justifyContent="center">
    //   <Box>
    //     <Grid container item>
    //       <Typography>Need to register?</Typography>
    //       <Button onClick={() => history.push("/register")}>Register</Button>
    //     </Grid>
    //     <form onSubmit={handleLogin}>
    //       <Grid>
    //         <Grid>
    //           <FormControl margin="normal" required>
    //             <TextField
    //               aria-label="username"
    //               label="Username"
    //               name="username"
    //               type="text"
    //             />
    //           </FormControl>
    //         </Grid>
    //         <FormControl margin="normal" required>
    //           <TextField
    //             label="password"
    //             aria-label="password"
    //             type="password"
    //             name="password"
    //           />
    //         </FormControl>
    //         <Grid>
    //           <Button type="submit" variant="contained" size="large">
    //             Login
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </Box>
    // </Grid>

    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={6} md={5} elevation={6} component={Paper} square>
        <img src={img} alt="" className={classes.introImage} />
      </Grid>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={7} elevation={6} component={Paper} square>
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
            {/* <LoginForm handleSubmit={handleSubmit} demoLogin={demoLogin} /> */}
            <form onSubmit={handleLogin}>
              <Grid>
                <Grid>
                  <FormControl margin="normal" required>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <FormControl margin="normal" required>
                  <TextField
                    label="password"
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                </FormControl>
                <Grid>
                  <Button type="submit" variant="contained" size="large">
                    Login
                  </Button>
                </Grid>
              </Grid>
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
