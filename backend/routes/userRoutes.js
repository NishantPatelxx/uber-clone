const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controller/userController");
const authMiddleware = require('../middleware/auth.middleware')

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First-name should contain atleast 3 or more characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password should contain atleast 6 characters"),
  ],

  userController.register
);

router.post('/login' , [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min : 6}).withMessage("password should contain atleast 6 characters")
] , userController.login)
router.get("/profile" , authMiddleware.authUser , userController.getUserProfile)
router.get("/logout" , authMiddleware.authUser , userController.logout)

module.exports = router