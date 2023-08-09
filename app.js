const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const {
  getProducts,
  createProducts,
} = require("./controllers/product.controllers");

//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Route is working! YOYO");
});

app.get("/api/v1/product", getProducts);

app.post("/api/v1/product", createProducts);

module.exports = app;
