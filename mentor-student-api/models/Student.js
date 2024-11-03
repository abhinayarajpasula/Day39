const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor', // Link to the Mentor model
    },
});

module.exports = mongoose.model('Student', studentSchema);