const express = require('express');
const upload = require('../middleware/upload');
const {
  getTeachers,
  createTeacher,
  uploadAvatar,
} = require('../controllers/teacherController');

const router = express.Router();

router.get('/', getTeachers);
router.post('/upload-avatar', upload.single('avatar'), uploadAvatar);
router.post('/', upload.single('avatar'), createTeacher);

module.exports = router;
