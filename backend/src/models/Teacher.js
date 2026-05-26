const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema(
  {
    type: String,
    school: String,
    major: String,
    year: Number,
    isGraduated: Boolean,
  },
  { _id: true }
);

const teacherSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    code: { type: String, required: true, unique: true },
    startDate: Date,
    endDate: Date,
    teacherPositionsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeacherPosition' }],
    degrees: [degreeSchema],
  },
  { timestamps: true, collection: 'teachers' }
);

module.exports = mongoose.model('Teacher', teacherSchema);
