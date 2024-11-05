const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');

// Routes
router.post('/', studentService.createStudent);
router.get('/:studentId', studentService.getStudentById);
router.put('/:studentId', studentService.updateStudent);
router.delete('/:studentId', studentService.deleteStudent);
router.get('/', studentService.getAllStudents);

module.exports = router;
