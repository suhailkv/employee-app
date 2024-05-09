import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/employeeSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addEmployee({
        name,
        designation,
        department,
        dateOfJoining,
        address,
      })
    );

    history("/dashboard");
  };

  return (
    <>
      <Navbar />
      <Container style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h5">Add Employee</Typography>
        <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
          <TextField
            label="Employee Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Designation"
            variant="outlined"
            fullWidth
            required
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Department"
            variant="outlined"
            fullWidth
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Date of Joining"
            variant="outlined"
            fullWidth
            required
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Employee
          </Button>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default AddEmployee;
