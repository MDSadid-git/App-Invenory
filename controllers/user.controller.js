const {
  userSingUpService,
  userFindByEmail,
} = require("../services/user.services");
const bcrypt = require("bcrypt");

// user create area start
exports.userSingUp = async (req, res, next) => {
  try {
    const user = await userSingUpService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Success to sing up!!!",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the User",
      message: error.message,
    });
  }
};
// user create area end

// user login area start

// login befor work
// 1. check if Email and password are given
// 2. Load user with email
// 3. if not user send res
// 4. compare password
// 5. if password not correct send res
// 6. check if is active
// 7. if not active send  res
// 8. generate   token
// 9. send  user  and   token
exports.userlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide you credentials",
      });
    }
    const user = await userFindByEmail(req.body);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account first",
      });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(402).json({
        status: "fail",
        error: "Is not Correct",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Success to login!!!",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the User",
      message: error.message,
    });
  }
};
// user login area end
