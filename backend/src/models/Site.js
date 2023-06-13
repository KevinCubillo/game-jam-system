const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    country: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    jamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jam',
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
