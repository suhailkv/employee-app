const express = require("express");
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");
const { employeePostValidation } = require("../middleware/validation");
const router = express.Router();

// Create new employee
router.post("/", auth, employeePostValidation, async (req, res) => {
  try {
    const { name, designation, department, dateOfJoining, address } = req.body;
    const newEmployee = new Employee({
      name,
      designation,
      department,
      dateOfJoining,
      address,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
});

// Get all employees
router.get("/", auth, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
});

// Update employee
router.put("/:id", auth, employeePostValidation, async (req, res) => {
  try {
    const { name, designation, department, dateOfJoining, address } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, designation, department, dateOfJoining, address },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Internal Error" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee" });
  }
});

// Delete employee
router.delete("/:id", auth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee" });
  }
});

module.exports = router;
