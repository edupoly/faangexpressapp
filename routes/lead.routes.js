const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Leads related routes untai");
});

router.get("/abcd", (req, res) => {
  res.send("ABCD route ki request vachindi.... please wait...");
});

module.exports = router;
