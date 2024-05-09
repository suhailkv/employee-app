import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import { fetchEmployees, deleteEmployee } from "../store/employeeSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

import Footer from "../components/Footer";

const Dashboard = () => {
  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleUpdate = (employeeId) => {
    history(`/update-employee/${employeeId}`);
  };
  const handleDelete = (employeeId) => {
    dispatch(deleteEmployee({ id: employeeId }));
  };

  return (
    <>
      <Navbar />
      <Container style={{ textAlign: "center", padding: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date of Joining</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.dateOfJoining}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>
                  <Button
                    style={{ marginRight: "10px" }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(employee._id)}
                  >
                    Update
                  </Button>
                  <Button
                    style={{ backgroundColor: "red" }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
