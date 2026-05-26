const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    address: String,
    identity: String,
    dob: Date,
    avatar: String,
    isDeleted: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['STUDENT', 'TEACHER', 'ADMIN'],
      default: 'TEACHER',
    },
  },
  { timestamps: true, collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
