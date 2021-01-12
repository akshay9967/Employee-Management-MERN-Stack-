const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { mongoURL } = require("./config/keys.js");
const path = require("path");

var app = express();
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log("Error");
  });

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use("/api", require("./route/routes.js"));
app.use("/auth", require("./route/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(PORT, (res, req) => {
  console.log(`server is running at localhost:${PORT}`);
});
