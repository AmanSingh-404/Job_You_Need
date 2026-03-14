const { Router} = require('express')

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
*/

authRouter.post("/register", (req, res) => {
     
})

module.exports = authRouter