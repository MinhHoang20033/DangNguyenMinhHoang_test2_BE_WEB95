require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { EJSON } = require('bson');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/school';

const loadJson = (filename) => {
  const filePath = path.join(__dirname, '../../mock-data', filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  return EJSON.parse(raw);
};

const seed = async () => {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const collections = [
    { name: 'users', file: 'school.users.json' },
    { name: 'teachers', file: 'school.teachers.json' },
    { name: 'teacherpositions', file: 'school.teacherpositions.json' },
  ];

  for (const { name, file } of collections) {
    const count = await db.collection(name).countDocuments();
    if (count > 0) {
      console.log(`Skip ${name}: already has ${count} documents`);
      continue;
    }
    const docs = loadJson(file);
    await db.collection(name).insertMany(docs);
    console.log(`Imported ${docs.length} documents into ${name}`);
  }

  await mongoose.disconnect();
  console.log('Seed done');
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
