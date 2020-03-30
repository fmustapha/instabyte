const express = require("express");
const Joi = require("joi");
const app = express();
const log = require("./middleware/logger");
const auth = require("./middleware/auth");

app.use(express.json()); // set req.body property

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
  const schema = {
    name: Joi.string().min(3).required(),
    extension: Joi.string()
  }
  
  const result = Joi.validate(req.body, schema)
  if (result.error) {
    res
      .status(400)
      .send(result.error.details[0].message);
  }

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
