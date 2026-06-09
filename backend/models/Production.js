const mongoose = require("mongoose");

const productionSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "In Progress",
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Production",
  productionSchema
);