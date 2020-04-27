const express = require("express");
const router = express.Router();
// const cors = require("cors");
const Joi = require("Joi");


router.get("/", (req, res) => {
  res.send("Instabyte is here!");
});

module.exports = router;
