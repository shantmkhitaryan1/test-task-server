const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('./services/CronJobService');

// env
require("dotenv").config();
const port = process.env.PORT || 8000;

// routes
const authRoutes = require("./routes/authRoutes");
const compaignRoutes = require("./routes/compaignRoutes");
const donateRoutes = require("./routes/donateRoutes");
const fraudRoutes = require("./routes/fraudRoute");

// ----------------------------------------

// MIDDLEWARE
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));


app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    // origin: '*',
  })
);
// use routes

app.use("/api/auth", authRoutes);
app.use("/api/compaign", compaignRoutes);
app.use("/api/donate", donateRoutes);
app.use("/api/fraud", fraudRoutes);

// listen port
app.listen(port, () => console.log(`Server started on port ${port}`));
