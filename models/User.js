const { timeStamp } = require('console')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Username is required'],
        unique : true,
        trim: true
    },
    email : {
        type : String,
        required: [true, 'email is required'],
        trim: true,
        unique:true,
        lowercase : true
    },
    password : {
        type : String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  //can only allow 'user' or 'admin' roles
        default: 'user'
    }
},
{timestamps:true})

module.exports = mongoose.model('User', UserSchema)