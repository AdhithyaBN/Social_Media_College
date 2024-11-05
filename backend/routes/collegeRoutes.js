const express = require('express');
const router = express.Router();
const collegeService = require('../services/collegeService');

// Routes
router.post('/', collegeService.createCollege);
router.get('/:collegeId', collegeService.getCollegeById);
router.put('/:collegeId', collegeService.updateCollege);
router.delete('/:collegeId', collegeService.deleteCollege);
router.get('/', collegeService.getAllColleges);
router.post('/:collegeId/clubs', collegeService.addClubToCollege);
router.post('/:collegeId/events', collegeService.addEventToCollege);

module.exports = router;
