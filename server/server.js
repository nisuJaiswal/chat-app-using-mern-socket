const express = require('express')
require('dotenv').config()
const connectDataBase = require('./config')
const { chats } = require('./data/data.js')
const cors = require('cors')
const { errorHandlerMiddleware } = require('./middlewares/errorMiddleware')
// const { isLastMessage } = require('../client/src/ChatLogic/ChatLogic')

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
// CHAT ROUTES
app.use('/api/chat', require('./routes/chatRoutes'))
// MESSAGE ROUTES
app.use('/api/message', require('./routes/messageRoutes'))

// MIDDLEWARES
app.use(errorHandlerMiddleware)


const server = app.listen(PORT, () => console.log(`App is running on 'http://localhost:${PORT}'`))

// Socket IO Implementation
const io = require('socket.io')(server, {
    pingTimeOut: 60000,
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket) => {
    console.log('Connected to Socket.io')

    socket.on('setup', (userData) => {
        socket.join(userData._id)
        socket.emit('connected')
    })

    socket.on('join room', (room) => {
        socket.join(room)
        console.log("user joined room", room)
    })

    socket.on('new message', newMessageRecieved => {
        let chat = newMessageRecieved.chat
        if (!chat.users) return console.log("Chat has no users")

        chat.users.forEach(user => {
            if (user._id === newMessageRecieved.sender._id) return

            socket.in(user._id).emit('message recieved', newMessageRecieved)
        })
    })
})

