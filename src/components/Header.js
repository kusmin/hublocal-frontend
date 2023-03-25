import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { default as AccountCircleIcon } from "@material-ui/icons/AccountCircle";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import BusinessIcon from "@material-ui/icons/Business";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../components/Toast";
import AuthService from "../service/AuthService";
import { logout } from "../store/slices/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 30,
    lineHeight: "20px",
    color: "#000000",
  },
  userIcon: {
    marginLeft: theme.spacing(1),
    color: "#000000",
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
    color: "#000000",
  },
  appBar: {
    backgroundColor: "#FFFFFF",
  },
  menu: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
  companyIcon: {
    marginRight: theme.spacing(1),
  },
  userName: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 20,
    lineHeight: "20px",
    color: "#000000",
  },
}));

const Header = ({title}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userName = useSelector((state) => state.auth.user.user.nome);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    AuthService.logout();
    handleClose();
    showToast("success", "Deslogado com sucesso!");
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <BusinessIcon className={classes.companyIcon} />
            {title}
          </Typography>
          <div className={classes.menu}>
            <AccountCircleIcon className={classes.userIcon} />
            <Typography variant="subtitle1" className={classes.userName}>
              {userName}
            </Typography>

            <IconButton
              edge="end"
              color="inherit"
              aria-label="Opções do usuário"
              onClick={handleMenu}
            >
              {open ? (
                <ArrowDropUp className={classes.arrowIcon} />
              ) : (
                <ArrowDropDown className={classes.arrowIcon} />
              )}
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {/* <MenuItem onClick={handleClose}>Perfil</MenuItem> */}
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
