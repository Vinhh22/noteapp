const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const noteRoutes = require('./routes/notes');

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Routes =====
app.use('/api', noteRoutes);

// ===== Route kiểm tra server =====
app.get('/', (req, res) => {
  res.json({ message: '🟢 NoteApp Backend đang chạy!' });
});

// ===== Kết nối MongoDB và khởi chạy server =====
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/noteapp';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Kết nối MongoDB thành công!');
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Lỗi kết nối MongoDB:', err.message);
    process.exit(1);
  });

