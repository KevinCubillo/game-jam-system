const mongoose = require('mongoose');
const User = require('./User');


const siteSchema = new mongoose.Schema({
    country: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    globalOrganizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    localOrganizers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}],
    judges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}],
    mentors : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}],
});


module.exports = mongoose.model('Site', siteSchema);
