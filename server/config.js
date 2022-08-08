const mongoose = require('mongoose')
const colors = require('colors')

// Connect to Mongodb
const connectDataBase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })

        console.log(`Connected to Mongodb ${connection.connection.host}`.green.bold)
    } catch (error) {
        console.log(`Error: ${error}`.red.bold)
    }
}

module.exports = connectDataBase