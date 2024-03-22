const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const productRouter = require("./src/routers/ProductRouter");

const app = express();

// Middleware for security
const corsOptions = {
  origin: ["*"],
  credentials: true,
  optionSuccessStatus: 200,
};
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(limiter);

// Middleware for logging
app.use(morgan("dev"));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Gadget-Hub Server" });
});

// API endpoints
app.use("/api/v1", productRouter);

// Middleware for handling invalid URLs
app.get("*", (req, res) => {
  res.status(404).json({ message: "Invalid URL" });
});

module.exports = app;
