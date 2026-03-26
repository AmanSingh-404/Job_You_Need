const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const blacklistModel = require("../models/blacklist.model") 

/**
 * @name registerUserController
 * @description register a new user, expects username, email, password
 * @route POST /api/auth/register
 * @access Public
*/

async function registerUser(req, res) {
   const {username, email, password} = req.body;

   if(!username || !email || !password){
    return res.status(400).json({
        message:"Please Provide username, email, password" 
    })
   }

   const isUserAlreadyExists = userModel.findOne({
    $or: [{username}, {email}]
   })
   if(isUserAlreadyExists){
    return res.status(401).json({
        message:"Account already exists with email and username"
    })
   }

   const hashPassword = await bcrypt.hash(password, 10);

   const user = userModel.create({
    username,
    email,
    password: hash
   })

   const token = jwt.sign({id: user._id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "29d"}
   )

   res.cookie("token", token)

   res.status(201).json({
    message:"User Registered successfully",
    user:{
        id: user._id,
        username: user.username,
        email: user.email
    }
   })
    
}


/**
 * @name loginUserController
 * @description login existing User only
 * @access Public
*/

async function loginUserController(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"User Not Found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({id:user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message:"User Logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function logoutUserController(req, res) {
    const token = req.cookiea.token

    if(token){
        await blacklistModel.create({
            token
        })
    }

    rs.clearCookie("token")
    return res.status(200).json({
        message:"User Logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUserController,
    logoutUserController
}