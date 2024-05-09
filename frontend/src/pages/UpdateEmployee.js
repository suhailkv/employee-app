import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../store/employeeSlice";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { formatDate } from "../utils/utility";
const UpdateEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the route parameters
  const employees = useSelector((state) => state.employee.employees); //get employees from redux store
  const dispatch = useDispatch();
  const history = useNavigate();

  // Find the employee by ID
  const employee = employees.find((emp) => emp._id === id);

  const [name, setName] = useState(employee ? employee.name : "");
  const [designation, setDesignation] = useState(
    employee ? employee.designation : ""
  );
  const [department, setDepartment] = useState(
    employee ? employee.department : ""
  );
  const [dateOfJoining, setDateOfJoining] = useState(
    employee ? formatDate(employee.dateOfJoining) : ""
  );
  const [address, setAddress] = useState(employee ? employee.address : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateEmployee({
        id,
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
        <Typography variant="h5">Update Employee</Typography>
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
            Update Employee
          </Button>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default UpdateEmployee;
