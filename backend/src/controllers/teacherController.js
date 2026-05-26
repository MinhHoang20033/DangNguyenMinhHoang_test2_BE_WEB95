const Teacher = require('../models/Teacher');
const User = require('../models/User');
const generateTeacherCode = require('../utils/generateTeacherCode');
const { getHighestDegree } = require('../utils/degreeLabel');
const { uploadImageBuffer } = require('../services/cloudinaryService');

const mapTeacherItem = (teacher) => {
  const user = teacher.userId || {};
  const positions = (teacher.teacherPositionsId || [])
    .map((p) => p?.name)
    .filter(Boolean);
  const highest = getHighestDegree(teacher.degrees);

  return {
    _id: teacher._id,
    code: teacher.code,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    avatar: user.avatar,
    isActive: teacher.isActive,
    positions,
    degrees: (teacher.degrees || []).map((d) => ({
      type: d.type,
      school: d.school,
      major: d.major,
      year: d.year,
      isGraduated: d.isGraduated,
    })),
    highestDegree: highest,
    startDate: teacher.startDate,
    endDate: teacher.endDate,
  };
};

const getTeachers = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    const [total, teachers] = await Promise.all([
      Teacher.countDocuments(filter),
      Teacher.find(filter)
        .populate('userId')
        .populate('teacherPositionsId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    const data = teachers
      .filter((t) => t.userId)
      .map(mapTeacherItem);

    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const parseJsonField = (value, fallback) => {
  if (!value) return fallback;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      identity,
      dob,
      isActive,
      startDate,
      endDate,
      teacherPositionsId,
      degrees,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Họ tên và email là bắt buộc' });
    }

    const emailExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (emailExists) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    let avatarUrl = req.body.avatar || '';
    if (req.file) {
      avatarUrl = await uploadImageBuffer(req.file.buffer);
    }

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      phoneNumber,
      address,
      identity,
      dob: dob ? new Date(dob) : undefined,
      avatar: avatarUrl,
      role: 'TEACHER',
      isDeleted: false,
    });

    const code = await generateTeacherCode();
    const positions = parseJsonField(teacherPositionsId, []);
    const degreeList = parseJsonField(degrees, []);

    const teacher = await Teacher.create({
      userId: user._id,
      code,
      isActive: isActive !== undefined ? isActive === true || isActive === 'true' : true,
      isDeleted: false,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : undefined,
      teacherPositionsId: positions,
      degrees: degreeList,
    });

    const populated = await Teacher.findById(teacher._id)
      .populate('userId')
      .populate('teacherPositionsId');

    res.status(201).json({
      message: 'Tạo giáo viên thành công',
      data: mapTeacherItem(populated),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Dữ liệu bị trùng (email hoặc mã)' });
    }
    res.status(500).json({ message: error.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng chọn ảnh' });
    }
    const url = await uploadImageBuffer(req.file.buffer);
    res.json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTeachers, createTeacher, uploadAvatar };
