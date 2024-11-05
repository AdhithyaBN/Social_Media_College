const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    students: [{
        type: Schema.Types.ObjectId, 
        ref: 'Student',  // Reference to the Student model
        required: true
    }],
    college: {
        type: Schema.Types.ObjectId, 
        ref: 'College',  // Reference to the College model
        required: true
    },
    department: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    foundedYear: {
        type: Number,
        required: true
    },
    events: [{
        type: Schema.Types.ObjectId, 
        ref: 'Event' // Reference to the Event model
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Middleware to update `updatedAt` field on document update
ClubSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Club', ClubSchema);
