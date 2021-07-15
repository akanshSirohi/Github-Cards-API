const express = require("express");
const router = express.Router();
const { getTestSvg } = require("../test");

router.get("/", (req, res) => {
  res.json({ svg: getTestSvg() });
});

module.exports = router;
