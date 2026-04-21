const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/ChatHistory');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, 'report-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// @route   POST api/chat/message
// @desc    Send message and get AI response (mock)
router.post('/message', [auth, upload.array('files')], async (req, res) => {
  const { content } = req.body;
  const files = req.files ? req.files.map(f => f.path) : [];
  
  try {
    let chat = await ChatHistory.findOne({ user: req.user.id });
    if (!chat) {
      chat = new ChatHistory({ user: req.user.id, messages: [] });
    }

    // User message
    const userMsg = { role: 'user', content, attachments: files };
    chat.messages.push(userMsg);

    // AI Mock Response Logic
    let aiResponse = "I've analyzed your input. Based on the details provided, you seem to be in good health, but I recommend staying hydrated and monitoring your activity levels.";
    if (content.toLowerCase().includes('pain') || content.toLowerCase().includes('headache')) {
      aiResponse = "I'm sorry to hear you're feeling unwell. A persistent headache could be due to stress or dehydration. If it continues, please consult a specialist.";
    }
    if (files.length > 0) {
      aiResponse = "I've received your medical report. I'm processing the data now. Initial scans show normal parameters, but I'll provide a detailed summary shortly.";
    }

    const aiMsg = { role: 'assistant', content: aiResponse };
    chat.messages.push(aiMsg);

    await chat.save();
    
    // Simulate delay for AI feel
    const delay = process.env.AI_MOCK_DELAY || 1500;
    setTimeout(() => {
      res.json({ userMsg, aiMsg });
    }, delay);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/chat/history
// @desc    Get chat history
router.get('/history', auth, async (req, res) => {
  try {
    const chat = await ChatHistory.findOne({ user: req.user.id });
    res.json(chat ? chat.messages : []);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
