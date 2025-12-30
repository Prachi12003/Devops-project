require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database
connectDB();

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
