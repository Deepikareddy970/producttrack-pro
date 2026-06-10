const express = require("express");

const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Inventory = require("../models/Inventory");
const Production = require("../models/Production");
const Sales = require("../models/Sales");

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const employeesData = await Employee.find().sort({
      createdAt: -1,
    });

    const attendance = await Attendance.countDocuments();

    const inventory = await Inventory.countDocuments();

    const production = await Production.countDocuments();

    const salesData = await Sales.find();

    const revenue = salesData.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    res.json({
      employees: employeesData.length,
      attendance,
      inventory,
      production,
      sales: salesData.length,
      revenue,
      recentEmployees: employeesData.slice(0, 5),
      recentOrders: salesData.slice(-5).reverse(),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;