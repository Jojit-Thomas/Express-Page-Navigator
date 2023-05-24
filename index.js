const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const urlRouter = require("./middlewares/urlRouter");
const createHttpError = require("http-errors");
require("./models/models.init");

const app = express();

mongoose
  .connect(process.env.MONGO_URI, { dbName: "SampleApp" })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
// app.use(cookieParser());

// Add headers before the routes are defined
app.use((req, res, next) => {
  const corsWhitelist = ["http://localhost:3000"];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, community"
    );
  }
  // Pass to next layer of middleware
  next();
});

app.options("*", (_, res) => {
  // browsers call this route to check if the api call allows the cors
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api", urlRouter);

app.use((err, req, res, next) => {
  if (err instanceof createHttpError.HttpError) {
    return res.status(err.statusCode).send(err.message);
  } else {
    console.log(err); 
    return res.status(500).send("Oops! Something went wrong on our end. Please try again. ");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
