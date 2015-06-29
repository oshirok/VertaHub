var mongoose = require('mongoose');

// Set up the mongoose model
module.exports = mongoose.model('Event', {
    timestamp: {type: Date, default: Date.now},
    name: String,
    desc: String,
    location: String,
    category: String,
    time_from: Date,
    time_to: Date,
    attendees: Array
});