const MongoDB = require("../config/database");
const Employee = require("../models/employees.js");
const ObjectId = require("mongodb").ObjectId;

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid contact ID" });
  }
  try {
    const { id } = req.params;
    const mongoose = require("mongoose");

    let employee = null;

    // Try treating id as a Mongo ObjectId first
    if (mongoose.Types.ObjectId.isValid(id)) {
      employee = await Employee.findById(id);
    }
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  const {
    employeeId,
    name,
    lastName,
    email,
    mobileNumber,
    position,
    department,
  } = req.body;
  const newEmployee = new Employee({
    employeeId,
    name,
    lastName,
    email,
    mobileNumber,
    position,
    department,
  });

  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid contact ID" });
  }
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(204).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid contact ID" });
  }
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
