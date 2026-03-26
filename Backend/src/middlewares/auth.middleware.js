const jwt = require("jsonwebtoken")

async function authUser(req, res, next) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unautharized"
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

module.exports = {
    authUser
}