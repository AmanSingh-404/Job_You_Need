const express = require('express')

/* 
require all the routes here
*/
const authRouter = require('./routes/auth.routes')

const app = express();
app.use(express.json())
app.use(cookieParser())
/* 
require all the routes here
*/
app.use("/api/auth", authRouter)

module.exports = app