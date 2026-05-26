const TeacherPosition = require('../models/TeacherPosition');

const getTeacherPositions = async (_req, res) => {
  try {
    const positions = await TeacherPosition.find().sort({ createdAt: 1 });
    res.json({ data: positions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTeacherPosition = async (req, res) => {
  try {
    const { name, code, des, isActive } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: 'Mã và tên là bắt buộc' });
    }

    const exists = await TeacherPosition.findOne({ code: code.trim() });
    if (exists) {
      return res.status(400).json({ message: 'Mã vị trí đã tồn tại' });
    }

    const position = await TeacherPosition.create({
      name,
      code: code.trim(),
      des,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      isDeleted: false,
    });

    res.status(201).json({
      message: 'Tạo vị trí công tác thành công',
      data: position,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Mã vị trí đã tồn tại' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTeacherPositions, createTeacherPosition };
