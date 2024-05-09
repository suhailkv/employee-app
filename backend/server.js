// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const app = express();
const CONSTANTS = require("./constants");
global.CONSTANST = CONSTANTS;
const PORT = CONSTANTS.PORT || 5000;
// Middleware
app.use(
  cors({
    origin: CONSTANTS.CORS_ENABLE_URLS,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose.connect(CONSTANTS.MONGODB_CONN_URL);

// Registering Routes
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
