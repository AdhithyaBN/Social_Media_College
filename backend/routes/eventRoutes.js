const express = require('express');
const router = express.Router();
const eventService = require('../services/eventService');

// Routes
router.post('/', eventService.createEvent);
router.get('/:eventId', eventService.getEventById);
router.put('/:eventId', eventService.updateEvent);
router.delete('/:eventId', eventService.deleteEvent);
router.get('/', eventService.getAllEvents);

module.exports = router;
