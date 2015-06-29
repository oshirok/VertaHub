var mongoose = require('mongoose');

// Set up the mongoose model
module.exports = mongoose.model('Comment', {
    timestamp: { type: Date, default: Date.now },
    text: String
});