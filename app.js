const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const noteRouter = require("./controllers/notes");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const tokenRouter = require("./controllers/token");
// const shareRouter = require("./controllers/share");
const config = require("./utils/config");
const mongoose = require("mongoose");
const { unknownEndpoint, errorHandler } = require("./utils/middleware");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/notes", noteRouter);
app.use("/api/token", tokenRouter);
// app.use("/api/share", shareRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

mongoose.connect(config.MONGODB_URI);

module.exports = app;
