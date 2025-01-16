const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListedToken = require("../model/blacklistedToekn.model");
const captainModel = require("../model/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  const isBlacklisted = await blackListedToken.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth-middelware is", error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  const isBlacklisted = await blackListedToken.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    next();
  } catch (error) {
    console.log("Error in auth-middleware is", error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
