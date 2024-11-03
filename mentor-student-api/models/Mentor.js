const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Mentor', MentorSchema);