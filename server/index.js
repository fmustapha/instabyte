const startUpDebugging = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db')
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const Joi = require("joi");
const app = express();
const log = require("./middleware/logger");
const auth = require("./middleware/auth");

app.use(express.json()); // set req.body property
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugging("morgan running...");
}

//Db Debugging
dbDebugger('Connecting to the Database...')

app.use(log);
app.use(auth);

const images = [
  { id: 1, name: "myImage", extension: "jpeg" },
  { id: 2, name: "mine", extension: "jpg" }
];

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Instabyte is here!");
});

app.get("/api/images", (req, res) => {
  res.send(images);
});

app.get("/api/images/:id", (req, res) => {
  const image = images.find(i => i.id === parseInt(req.params.id));
  if (!image)
    return res.status(404).send("The image you requested is not found");
  return res.send(image);
});

/** Image Post Route */
app.post("/api/images", (req, res) => {
  const { error } = validateImage(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  
  const image = {
    id: images.length + 1,
    name: req.body.name,
    extension: req.body.extension
  };

  images.push(image);
  res.status(200).send("Upload Successful");
  return image;
});

app.put("/api/images/:id", (req, res) => {
  const image = images.find(i => i.id === parseInt(req.params.id));
  if (!image)
    return res.status(404).send("The image you requested is not found");

  const { error } = validateImage(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  

  image.name = req.body.name;
  res.send(image);
});

app.delete("/api/images/:id", (req, res) => {
  const image = images.find(e => e.id === parseInt(req.params.id));
  if (!image)
    return res.status(404).send("The image you requested is not found");

  let index = images.indexOf(image);
  images.splice(index, 1)
  
  res.send(image);
});

function validateImage(image) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    extension: Joi.string()
  };

  return Joi.validate(image, schema);
}

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}/`);
});

// fs.readdir('./', (err, files) => {
// if(err) console.log("Error", err);
// else console.log(files, 'Response')
// });
// const pathObj = path.parse(__filename); /* Use this to get the filename extension

// log(pathObj);
