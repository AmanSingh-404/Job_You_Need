const { Router} = require('express')
const { registerUser, loginUserController, logoutUserController, getMeController } = require('../controllers/auth.controller')
const {authUser} = require("../middlewares/auth.middleware")

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
*/

authRouter.post("/register", registerUser)

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access public
*/

authRouter.post("/login", loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear token from user, expects email and password in the request body
 * @access Private
*/

authRouter.get("/logout", logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
*/

authRouter.get("/get-me",authUser, getMeController)








module.exports = authRouter