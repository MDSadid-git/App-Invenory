const express = require("express");
const router = express.Router();
const userContoroller = require("../controllers/user.controller");

router.post("/signup", userContoroller.userSingUp);
router.post("/login", userContoroller.userlogin);

module.exports = router;
