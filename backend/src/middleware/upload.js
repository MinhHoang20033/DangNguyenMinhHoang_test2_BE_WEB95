const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file ảnh'));
    }
  },
});

module.exports = upload;
