const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },

    shopName: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    product: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Sales",
  salesSchema
);