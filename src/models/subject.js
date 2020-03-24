const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('models/user');

const Question = new new Schema({
    name : String
    , type : String
})

const answer = new new Schema({
    questionId : String
    , userId : String
    , value : String
    , createdAt : {type : Date, default : Date.now}
})

const Subject = new Schema({
    name : String
    , questions : [Question]
    , users : [User]
    , createdAt : {type : Date, default : Date.now}
})

module.exports = mongoose.model('Subject', Subject);