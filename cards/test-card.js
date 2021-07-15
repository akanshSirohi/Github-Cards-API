const express = require("express");
const router = express.Router();
const { getTestSvg } = require("../test");

router.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "public, max-age=10",
  });
  res.end(getTestSvg());
});

module.exports = router;
