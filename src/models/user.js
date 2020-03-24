const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    name: String
    , email: String
    , sabun : String
    , password : String
    , createdAt: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', User);