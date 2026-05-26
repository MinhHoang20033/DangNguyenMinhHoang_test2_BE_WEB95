const express = require('express');
const {
  getTeacherPositions,
  createTeacherPosition,
} = require('../controllers/teacherPositionController');

const router = express.Router();

router.get('/', getTeacherPositions);
router.post('/', createTeacherPosition);

module.exports = router;
