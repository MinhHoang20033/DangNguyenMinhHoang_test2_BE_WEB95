require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const teacherRoutes = require('./routes/teacherRoutes');
const teacherPositionRoutes = require('./routes/teacherPositionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/teachers', teacherRoutes);
app.use('/teacher-positions', teacherPositionRoutes);

app.use((err, _req, res, _next) => {
  res.status(400).json({ message: err.message || 'Lỗi server' });
});

const start = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `\nPort ${PORT} đang được dùng. Tắt process cũ rồi chạy lại:\n` +
          `  netstat -ano | findstr ":${PORT}"\n` +
          `  taskkill /PID <PID> /F\n`
      );
      process.exit(1);
    }
    throw err;
  });
};

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
