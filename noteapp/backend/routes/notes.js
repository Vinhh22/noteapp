const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// ─────────────────────────────────────────
// GET /api/notes
// Lấy toàn bộ ghi chú, sắp xếp mới nhất lên đầu
// ─────────────────────────────────────────
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách ghi chú',
      error: error.message,
    });
  }
});

// ─────────────────────────────────────────
// POST /api/notes
// Tạo một ghi chú mới
// ─────────────────────────────────────────
router.post('/notes', async (req, res) => {
  try {
    const { title, content, isPinned } = req.body;

    // Kiểm tra title bắt buộc
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Tiêu đề (title) là bắt buộc',
      });
    }

    const newNote = new Note({
      title: title.trim(),
      content: content ? content.trim() : '',
      isPinned: isPinned || false,
    });

    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi tạo ghi chú',
      error: error.message,
    });
  }
});

module.exports = router;

