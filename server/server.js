const express = require('express')
require('dotenv').config()
const connectDataBase = require('./config')
const { chats } = require('./data/data.js')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express()

connectDataBase()
app.use(cors())

// DEFAULT PATH
app.get('/', (req, res) => {
    res.send('Running Successfully')
})

// GET ALL CHATS
app.get('/api/chats', (req, res) => {
    res.send(chats)
})

// GET CHAT SINGLE BY ID
app.get('/api/chats/:id', (req, res) => {
    const chat = chats.find(chat => chat._id === req.params.id)
    res.send(chat)
})

app.listen(PORT, () => console.log(`App is running on 'http://localhost:${PORT}'`))