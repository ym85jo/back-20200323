const mongoose = require('mongoose');
const { Schema } = mongoose;

const Group = new Schema({
    name : String
})

module.exports = mongoose.model('Group', Group);