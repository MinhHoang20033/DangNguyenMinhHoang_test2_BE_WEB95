const cloudinary = require('../config/cloudinary');

const uploadImageBuffer = (buffer) => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    return Promise.reject(
      new Error('Chưa cấu hình Cloudinary trong file .env')
    );
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'teacher-management', resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

module.exports = { uploadImageBuffer };
