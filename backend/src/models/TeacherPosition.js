const mongoose = require('mongoose');

const teacherPositionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    des: String,
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'teacherpositions' }
);

module.exports = mongoose.model('TeacherPosition', teacherPositionSchema);
