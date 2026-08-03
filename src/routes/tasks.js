const express = require("express");

const router = express.Router();

const tasks = [];

router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

module.exports = router;