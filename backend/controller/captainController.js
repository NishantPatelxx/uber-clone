const captainModel = require("../model/captain.model");
const createCaptain = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    if (!fullname || !email || !password || !vehicle) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const existCaptain = await captainModel.findOne({ email });
    if (existCaptain) {
      return res.status(201).json({
        message: "Captain already exists",
      });
    }
    const hashedPassword = await captainModel.hashedPassword(password);
    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });
    const token = captainModel.generateToken();
    return res.status(201).json({
      token,
      captain,
    });
  } catch (error) {
    console.log("Error in register captain is", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.captainLogin = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Both fields are required" });
    }
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    const isMatch = await captainModel.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = captainModel.generateToken();
    res.cookie("token", token);
    return res.status(200).json({ token, captain });
  } catch (error) {
    console.log("Error in login captain is", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  const captain = req.captain;
  return res.status(200).json({ captain });
};

module.exports.captainLogout = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListedToken.create({ token });
  return res.status(200).json({
    message: "Logged out",
  });
};
