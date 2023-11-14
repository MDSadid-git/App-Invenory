const express = require("express");
const app = express();
const cors = require("cors");

// All Routes
const productRouter = require("./routes/product.route");
const brandRouter = require("./routes/brand.route");
const categoryRouter = require("./routes/category.route");

//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Route is working! YOYO");
});

app.use("/api/v1/product", productRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/category", categoryRouter);

module.exports = app;
