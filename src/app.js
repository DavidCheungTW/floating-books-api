const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({ result: "Welcome to Floating Books API!" });
});

module.exports = app;
