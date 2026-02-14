const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employees");
const validateEmployee = require("../middleware/validate");

// Get all employees
router.get("/", employeesController.getAllEmployees);

// Get employee by ID
router.get("/:id", employeesController.getEmployeeById);

// Create a new employee
router.post("/", validateEmployee, employeesController.createEmployee);

// Update an employee
router.put("/:id", validateEmployee, employeesController.updateEmployee);

// Delete an employee
router.delete("/:id", employeesController.deleteEmployee);

module.exports = router;
