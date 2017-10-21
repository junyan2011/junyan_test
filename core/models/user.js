// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const MySchema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new MySchema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        // required: true,
        unique: true,
    },
    datebirth: {
        type: Date,
    },
    validated: Boolean,
    admin: Boolean,
}));
