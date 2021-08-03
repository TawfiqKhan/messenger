import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  authHeader: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
  },
  accAside: {
    fontSize: 14,
    color: "#b0b0b0",
    fontWeight: 400,
    textAlign: "center",
    marginRight: 35,
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    padding: "1rem 0",
  },
  link: { textDecoration: "none" },
  accBtn: {
    width: 170,
    height: 54,
    borderRadius: theme.shape.borderRadius,
    filter: "drop-shadow(0px 2px 6px rgba(74,106,149,0.2))",
    backgroundColor: "#ffffff",
    color: "#3a8dff",
    boxShadow: "none",
    marginRight: 35,
  },
}));

const AuthHeader = (props) => {
  const classes = useStyles();
  return (
    <Box p={1} className={classes.authHeader}>
      <Typography className={classes.accAside}>{props.asideText}</Typography>
      <Link to={props.linkTo} className={classes.link}>
        <Button color="inherit" className={classes.accBtn} variant="contained">
          {props.btnText}
        </Button>
      </Link>
    </Box>
  );
};

export default AuthHeader;
