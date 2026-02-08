const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employees");

// Get all employees
router.get("/", employeesController.getAllEmployees);

// Get employee by ID
router.get("/:id", employeesController.getEmployeeById);

// Create a new employee
router.post("/", employeesController.createEmployee);

// Update an employee
router.put("/:id", employeesController.updateEmployee);

// Delete an employee
router.delete("/:id", employeesController.deleteEmployee);

module.exports = router;
