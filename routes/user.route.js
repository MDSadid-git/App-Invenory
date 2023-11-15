const express = require("express");
const router = express.Router();
const userContoroller = require("../controllers/user.controller");

router.post("/signup", userContoroller.userSingUp);

module.exports = router;
