import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 8,
  },
  authWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    minHeight: "100vh",
    paddingTop: 23,
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
    },
  },
  imageContainer: {
    position: "relative",
    background: "#3a8dff",
    [theme.breakpoints.down("xs")]: {
      height: 300,
    },
  },
  introImage: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    opacity: "0.4",
  },

  introText: {
    position: "absolute",
    zIndex: 100,
    top: "40%",
    left: "50%",
    fontSize: "2rem",
    width: "70%",
    fontWeight: 700,
    color: "#FFF",
    transform: "translate(-50%,-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
      width: "90%",
    },

    "& svg": {
      fontSize: "3.5rem",
      marginBottom: "5%",
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.5rem",
      },
    },
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
    fontWeight: 700,
    color: "#FFF",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

export default useStyles;
