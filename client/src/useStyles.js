import { makeStyles } from "@material-ui/core/styles";

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
  imageContainer: {
    position: "relative",
  },
  introImage: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
  },

  introText: {
    position: "absolute",
    zIndex: 100,
    top: "50%",
    left: "50%",
    fontSize: 38,
    width: "70%",
    fontWeight: 700,
    color: "#FFF",
    transform: "translate(-50%,-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg": {
      fontSize: 65,
      marginBottom: "5%",
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
  },
}));

export default useStyles;
