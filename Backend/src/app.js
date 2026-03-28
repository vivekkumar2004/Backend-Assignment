const express = require("express");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const taskRouter = require("./routes/taskRoutes");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
