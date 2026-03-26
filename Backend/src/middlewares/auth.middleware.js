const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unautharized"
        })
    }

    const isTokenBlacklistted = await blacklistModel.findOne({
        token
    })

    if(isTokenBlacklistted){
        return res.status(401).json({
            message:"token is invalid"
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