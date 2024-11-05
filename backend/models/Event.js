const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    organizedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'Club',  // Reference to the Club model
        required: true 
    },
    attendees: [{
        type: Schema.Types.ObjectId, 
        ref: 'Student'  // Reference to the Student model
    }]
});

module.exports = mongoose.model('Event', EventSchema);
