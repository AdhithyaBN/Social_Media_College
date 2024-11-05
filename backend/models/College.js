const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\d{10,15}$/, 'Please provide a valid phone number']
    },
    type: { 
        type: String, 
        required: true,
        enum: ['Public', 'Private', 'Autonomous', 'Deemed'], // Examples of college types
    },
    affiliation: { 
        type: String, 
        required: true 
    },
    foundedYear: { 
        type: Number, 
        required: true 
    },
    clubs: [{
        type: Schema.Types.ObjectId, 
        ref: 'Club'  // Reference to the approved Clubs
    }],
    clubsWaitingApproval: [{
        type: Schema.Types.ObjectId, 
        ref: 'Club'  // Reference to Clubs waiting for approval
    }],
    eventsConducted: [{
        type: Schema.Types.ObjectId, 
        ref: 'Event'  // Reference to Events
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
CollegeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('College', CollegeSchema);
