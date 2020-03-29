const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const os = require("os");
const log = require("./logger");

app.use(express.json());

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

app.post("/api/images", (req, res) => {
  const image = {
    id: images.length + 1,
    name: req.body.name,
    extension: req.body.extension
  };

  images.push(image);
  res.status(200).send("Upload Successful");
  return image;
});

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}/`);
});

// fs.readdir('./', (err, files) => {
// if(err) console.log("Error", err);
// else console.log(files, 'Response')
// });
// const pathObj = path.parse(__filename); /* Use this to get the filename extension

// log(pathObj);
