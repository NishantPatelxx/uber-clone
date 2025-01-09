const userModel = require('../model/user.model')
const userService = require("../services/user.service")
const {validationResult} = require("express-validator")
const blackListedToken = require("../model/blacklistedToekn.model")

module.exports.register = async(req , res , next) => {
    try
    {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {fullname , email , password} = req.body
        const userExist = await userModel.findOne({email})
        if(userExist) {
            return res.status(201).json({
                message : "User already exists"
            })
        }
        const hashedPassword = await userModel.hashPassword(password)
        const user = await userService.createUser({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password: hashedPassword
        })
        const token = user.generateToken()
        return res.status(201).json({
            token ,
            user
        })
    }catch(error){
        console.log("error in register is" , error)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}

module.exports.login = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({ message: 'Both fields are required' });
      }
  
      const user = await userModel.findOne({ email }).select('+password');
      if (!user) {
        return res.status(404).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Password' });
      }
  
      const token = user.generateToken();
      res.cookie('token', token);
      return res.status(200).json({ token, user });
    } catch (error) {
      console.log('Error in login is', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports.getUserProfile = async(req , res , next) => {
    return res.status(201).json(req.user)
  }

  module.exports.logout = async(req , res , next) =>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    await blackListedToken.create({ token });
    return res.status(200).json({
      message : "Logged out"
    })
  }