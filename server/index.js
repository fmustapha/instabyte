const startUpDebugging = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const Joi = require("joi");
const app = express();
const log = require("./middleware/logger");
const auth = require("./middleware/auth");
const images = require("./routes/images");
const home = require("./routes/home");

app.use(express.json()); // set req.body property
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugging("morgan running...");
}

//Db Debugging
dbDebugger("Connecting to the Database...");

app.use(log);
app.use(auth);
app.use("/api/images/", images);
app.use("/", home);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}/`);
});

// fs.readdir('./', (err, files) => {
// if(err) console.log("Error", err);
// else console.log(files, 'Response')
// });
// const pathObj = path.parse(__filename); /* Use this to get the filename extension

// log(pathObj);
