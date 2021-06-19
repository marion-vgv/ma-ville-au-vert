require("dotenv").config();

const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer();
app.use(upload.none());
const router = require("./app/router");

const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:1234", "null"],
  })
);

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(router);
app.listen(port, () => {
  console.log(`Launched, visit http://localhost:${port}`);
});
