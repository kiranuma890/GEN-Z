const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true

    }
});

const User = mongoose.model('User' ,userSchema)

module.exports = User