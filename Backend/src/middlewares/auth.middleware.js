const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
    let token = req.cookies.token;
    
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
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