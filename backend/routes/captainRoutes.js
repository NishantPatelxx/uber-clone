const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require("../controller/captainController");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", [
  body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be atleast 3 characters long'),
  body('fullname.lastname').isLength({ min: 3 }).withMessage('Lastname must be atleast 3 characters long'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
  body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be atleast 3 characters long'),
  body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be atleast 3 characters long'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be atleast 1'),
  body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], captainController.registerCaptain);

router.post("/login", [
  body("email").isEmail().withMessage("invalid email"),
  body("password").isLength({ min: 6 }).withMessage("password must be atleast 6 characters long")
], captainController.captainLogin);

router.get("/profile", authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get("/logout", authMiddleware.authCaptain, captainController.captainLogout);

module.exports = router;