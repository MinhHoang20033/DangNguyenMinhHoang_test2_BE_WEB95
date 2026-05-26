const DEGREE_MAP = {
  Bachelor: 'Cử nhân',
  Master: 'Thạc sĩ',
  Doctorate: 'Tiến sĩ',
  Associate: 'Cao đẳng',
  'Cử nhân': 'Cử nhân',
  'Thạc sĩ': 'Thạc sĩ',
  'Tiến sĩ': 'Tiến sĩ',
};

const getDegreeLabel = (type) => DEGREE_MAP[type] || type || '';

const getHighestDegree = (degrees = []) => {
  if (!degrees.length) return null;
  const order = ['Doctorate', 'Tiến sĩ', 'Master', 'Thạc sĩ', 'Bachelor', 'Cử nhân', 'Associate'];
  const sorted = [...degrees].sort(
    (a, b) => order.indexOf(a.type) - order.indexOf(b.type)
  );
  const top = sorted.find((d) => order.includes(d.type)) || degrees[0];
  return {
    type: getDegreeLabel(top.type),
    school: top.school,
    major: top.major,
  };
};

module.exports = { getDegreeLabel, getHighestDegree };
