const express = require("express");
const app = new express();
const router = require("./src/api");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// security middlware import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
const cors = require("cors");
const productRouter = require("./src/routers/ProductRouter");
const corsOptions = {
  origin: ["*"],
  credentials: true,
  optionSuccessStatus: 200,
};

// security middleware use
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(limiter);

// non security middleware use
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// home route
app.use("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Gadget-Hub Server" });
});

// api endpoints
app.use("/api/v1", productRouter);

app.get("*", (req, res) => {
  res.status(401).json({ message: "Invalid URL" });
});

module.exports = app;
