// Import the Event model
const Event = require('../models/Event');

// Create an Event
exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get Event by ID with College name
exports.getEventById = async (req, res) => {
    try {
        // Populate organizedBy (Club) and also nested college (College)
        const event = await Event.findById(req.params.eventId)
            .populate({
                path: 'organizedBy',
                populate: {
                    path: 'college',  // Populate college inside organizedBy
                    select: 'name'    // Only select the name of the college
                }
            })
            .populate('attendees');  // Populate attendees
        
        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update an Event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete an Event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Events with College name
exports.getAllEvents = async (req, res) => {
    try {
        // Populate organizedBy (Club) and also nested college (College)
        const events = await Event.find()
            .populate({
                path: 'organizedBy',
                populate: {
                    path: 'college',  // Populate college inside organizedBy
                    select: 'name'    // Only select the name of the college
                }
            })
            .populate('attendees');  // Populate attendees
        
        res.json(events);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
