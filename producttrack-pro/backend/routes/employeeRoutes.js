const express = require("express");

const router = express.Router();

const Employee = require("../models/Employee");

/* Get All Employees */

router.get("/", async (req, res) => {
  try {
    const employees =
      await Employee.find();

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* Add Employee */

router.post("/", async (req, res) => {
  try {
    const employee =
      await Employee.create({
        name: req.body.name,
        role: req.body.role,
        department:
          req.body.department,
      });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* Delete Employee */

router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Employee Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;