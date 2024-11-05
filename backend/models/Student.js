// models/Student.js
const mongoose = require('mongoose');

// Create the student schema
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
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',  // Reference to the College schema
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        default: '',
    },
    interests: [{
        type: String,
    }],
    clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',  // Reference to the Club schema
    }],
    profilePhotoUrl: {
        type: String,
        default: '',
    },
}, { timestamps: true });

// Export the Student model
module.exports = mongoose.model('Student', studentSchema);
