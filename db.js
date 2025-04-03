const mongoose = require('mongoose')

// Define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/mydatabase' // can replace 'mydatabase' with your database name

//set up MongoDB connection
mongoose.connect(mongoURL,{})

const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected',()=>{
    console.log('Connected to MongoDB server')
})

db.on('error',(err)=>{
    console.log('Mongoose connection error:',err)
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected')
})

// Export the database connection
module.exports = db;