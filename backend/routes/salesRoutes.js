const express = require("express");
const Sales = require("../models/Sales");

const router = express.Router();

/* Test Route */
router.get("/test", (req, res) => {
  res.json({
    message: "Sales Route Working",
  });
});

/* Get All Orders */
router.get("/", async (req, res) => {
  try {
    const orders = await Sales.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* Add Order */
router.post("/", async (req, res) => {
  try {
    const {
      customer,
      shopName,
      location,
      product,
      quantity,
      amount,
      status,
      date,
    } = req.body;

    const order = await Sales.create({
      customer,
      shopName,
      location,
      product,
      quantity,
      amount,
      status,
      date,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* Delete Order */
router.delete("/:id", async (req, res) => {
  try {
    await Sales.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;