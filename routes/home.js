const express = require("express");
const router = express.Router();
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
router.options('*', cors())
router.get("/", cors(corsOptions), (req, res) => {
  res.send("Instabyte is here!");
});

module.exports = router;
