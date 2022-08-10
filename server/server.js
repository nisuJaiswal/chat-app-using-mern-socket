const express = require('express')
require('dotenv').config()
const connectDataBase = require('./config')
const { chats } = require('./data/data.js')
const cors = require('cors')
const { errorHandlerMiddleware } = require('./middlewares/errorMiddleware')
const PORT = process.env.PORT || 5000
const app = express()

// Database Connection
connectDataBase()

// Middleware
app.use(express.json())
app.use(cors())

// DEFAULT PATH
app.get('/', (req, res) => {
    res.send('Running Successfully')
})

// USER ROUTES
app.use('/api/user', require('./routes/userRoutes'))

app.use(errorHandlerMiddleware)


app.listen(PORT, () => console.log(`App is running on 'http://localhost:${PORT}'`))