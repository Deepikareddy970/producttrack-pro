require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const salesRoutes = require("./routes/salesRoutes");
const productionRoutes = require("./routes/productionRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("🚀 ProductTrack Pro Backend Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server Running On Port ${PORT}`);
});