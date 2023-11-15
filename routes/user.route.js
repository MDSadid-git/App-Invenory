const express = require("express");
const router = express.Router();
const userContoroller = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup", userContoroller.userSingUp);
router.post("/login", userContoroller.userlogin);
router.get("/loginme", verifyToken, userContoroller.loginMe);

module.exports = router;
