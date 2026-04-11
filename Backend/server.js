require('dotenv').config()
const invokeGemini = require('./src/services/ai.services')
const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB()


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}!`)
})