const Teacher = require('../models/Teacher');

const generateTeacherCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    exists = await Teacher.exists({ code });
  }

  return code;
};

module.exports = generateTeacherCode;
