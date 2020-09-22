const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const UserShema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserShema.plugin(uniqueValidator)

module.exports = mongoose.model('User', UserShema)