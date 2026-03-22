const { Router} = require('express')
const { registerUser } = require('../controllers/auth.controller')

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
*/

authRouter.post("/register", registerUser)

module.exports = authRouter