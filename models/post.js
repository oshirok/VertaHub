var mongoose = require('mongoose');

// Set up the mongoose model
module.exports = mongoose.model('Post', {
    timestamp: { type: Date, default: Date.now },
    last_updated: {type: Date, default: Date.now },
    name: String,
    desc: String,
    category: Number,
    author: String
});