const express = require("express");
const router = express.Router();
// const cors = require("cors");
const Joi = require("Joi");
const images = require("../data/images.json");

router.get("/", (req, res) => {
  res.send(images);
});

router.get("/:id", (req, res) => {
  const image = images.find((i) => i.id === parseInt(req.params.id));
  if (!image)
    return res.status(404).send("The image you requested is not found");
  return res.send(image);
});

/** Image Post Route */
router.post("/", (req, res) => {
  const { error } = validateImage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const image = {
    id: images.length + 1,
    name: req.body.name,
    extension: req.body.extension,
  };

  images.push(image);
  res.status(200).send("Upload Successful");
  return image;
});

router.put("/:id", (req, res) => {
  const image = images.find((i) => i.id === parseInt(req.params.id));
  if (!image)
    return res.status(404).send("The image you requested is not found");

  const { error } = validateImage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  image.name = req.body.name;
  res.send(image);
});

router.delete("/:id", (req, res) => {
  const image = images.find((e) => e.id === parseInt(req.params.id));
  if (!image)
    return res.status(404).send("The image you requested is not found");

  let index = images.indexOf(image);
  images.splice(index, 1);

  res.send(image);
});

function validateImage(image) {
  const schema = {
    name: Joi.string().min(3).required(),
    extension: Joi.string(),
  };

  return Joi.validate(image, schema);
}

module.exports = router;