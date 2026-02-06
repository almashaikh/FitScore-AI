// src/models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  filepath: { type: String, required: true }, // path on server: /uploads/...
  text: { type: String, default: '' }, // parsed text (initially empty or basic extraction)
  uploadDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
