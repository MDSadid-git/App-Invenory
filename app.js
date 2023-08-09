const express = require("express");
const app = express();
const cors = require("cors");
const productRouter = require("./routes/product.route");

//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Route is working! YOYO");
});

app.use("/api/v1/product", productRouter);

module.exports = app;
