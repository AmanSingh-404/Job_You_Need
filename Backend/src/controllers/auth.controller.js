const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const blacklistModel = require("../models/blacklist.model") 

/**
 * @name registerUserController
 * @description register a new user, expects username, email, password
 * @route POST /api/auth/register
 * @access Public
*/

async function registerUser(req, res) {
   try {
       const {username, email, password} = req.body;

       if(!username || !email || !password){
        return res.status(400).json({
            message:"Please Provide username, email, password" 
        })
       }

       const isUserAlreadyExists = await userModel.findOne({
        $or: [{username}, {email}]
       })
       if(isUserAlreadyExists){
        return res.status(401).json({
            message:"Account already exists with email and username"
        })
       }

       const hashPassword = await bcrypt.hash(password, 10);

       const user = await userModel.create({
        username,
        email,
        password: hashPassword
       })

       const token = jwt.sign({id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "29d"}
       )

       res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
       })

       res.status(201).json({
        message:"User Registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
       })
   } catch (error) {
       console.error("Register Error:", error);
       res.status(500).json({ message: "Internal Server Error" });
   }
}


/**
 * @name loginUserController
 * @description login existing User only
 * @access Public
*/

async function loginUserController(req, res) {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message:"User Not Found"
            })
        }

        if(!user.password) {
            return res.status(400).json({
                message:"User registered using Google. Please use Google Login."
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

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        res.status(201).json({
            message:"User Logged in successfully",
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * @route GET api/auth/logout
 * @description logout user (clear token from user cookie and add the token to blacklist)
 * @access Private
*/

async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token

        if(token){
            await blacklistModel.create({
                token
            })
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        return res.status(200).json({
            message:"User Logged out successfully"
        })
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * @route GET api/auth/get-me
 * @description get the current logged in user details
 * @access Private
*/

async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
        return res.status(200).json({
            message:"User details fetched successfully",
            user
        })
    } catch (error) {
        console.error("GetMe Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    registerUser,
    loginUserController,
    logoutUserController,
    getMeController
}