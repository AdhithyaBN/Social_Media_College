const express = require('express');
const router = express.Router();
const clubService = require('../services/clubService');

// Routes
router.post('/', clubService.createClub);
router.get('/:clubId', clubService.getClubById);
router.put('/:clubId', clubService.updateClub);
router.delete('/:clubId', clubService.deleteClub);
router.get('/', clubService.getAllClubs);

module.exports = router;
