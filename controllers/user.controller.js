const { userSingUpService } = require("../services/user.services");

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
