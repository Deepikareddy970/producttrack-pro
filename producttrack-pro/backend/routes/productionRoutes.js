const express = require("express");
const Production = require("../models/Production");

const router = express.Router();

/* Test Route */
router.get("/test", (req, res) => {
  res.json({
    message: "Production API Working",
  });
});

/* GET All Records */
router.get("/", async (req, res) => {
  try {
    const records = await Production.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ADD Record */
router.post("/", async (req, res) => {
  try {
    const record = await Production.create(
      req.body
    );

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* DELETE Record */
router.delete("/:id", async (req, res) => {
  try {
    await Production.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Production Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;