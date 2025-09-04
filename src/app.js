const express = require("express");
const userRouter = require("./router/user.router.js"); // adjust path if needed

const app = express();

app.use(express.json());

// Use the routerS
app.use("/api", userRouter);

module.exports = app;  // ✅ now you export the Express app
