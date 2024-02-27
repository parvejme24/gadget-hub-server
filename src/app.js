const express = require("express");
const userRouter = require("./routers/UserRouter");
const router = require("./routers/api");
const app = new express();

app.use("/api/v1", userRouter);
app.use("/api/v1", router);

module.exports = app;
