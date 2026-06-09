const express = require("express");

const router = express.Router();

const Attendance = require("../models/Attendance");

/* Get All Attendance */

router.get("/", async (req, res) => {
  try {
    const attendance =
      await Attendance.find().sort({
        createdAt: -1,
      });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* Add Attendance */

router.post("/", async (req, res) => {
  try {
    const attendance =
      await Attendance.create({
        employeeName:
          req.body.employeeName,
        status: req.body.status,
        date: req.body.date,
      });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* Delete Attendance */

router.delete("/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Attendance Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;