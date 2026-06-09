const express = require("express");
const Inventory = require("../models/Inventory");

const router = express.Router();

/* Test Route */
router.get("/test", (req, res) => {
  res.json({
    message: "Inventory Route Working",
  });
});

/* Get All Inventory */
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* Add Inventory */
router.post("/", async (req, res) => {
  try {
    const { productName, quantity, price } = req.body;

    const item = await Inventory.create({
      productName,
      quantity,
      price,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* Delete Inventory */
router.delete("/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Inventory Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;