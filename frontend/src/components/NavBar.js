import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearStore } from "../store/employeeSlice"; // to clear Redux store
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogout = () => {
    dispatch(clearStore());
    history("/signup");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button component={Link} to="/dashboard" color="inherit">
          Dashboard
        </Button>
        <Button component={Link} to="/add-employee" color="inherit">
          Add Employee
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
