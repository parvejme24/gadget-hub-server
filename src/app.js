const express = require("express");
const userRouter = require("./routers/UserRouter");
const app = express();

app.use("/api/v1", userRouter);

module.exports = app;
