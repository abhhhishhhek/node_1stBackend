const mongoose = require('mongoose')

// Define person schema
const personSchema = new mongoose.Schema({
        name: { type: String, required: true },
        age: { type: Number },
        mobile: { type: String, required: true },
        work: { type: String, enum: ['chef', 'waiter', 'owner'], required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String },
        salary: { type: Number }
    });



 const Person = mongoose.model('Person',personSchema)
 module.exports= Person