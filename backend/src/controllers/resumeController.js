// src/controllers/resumeController.js
const path = require('path');
const Resume = require('../models/Resume');

// POST /api/resumes/upload
// Expects multipart/form-data with field "file"
exports.uploadResume = async (req, res) => {
  try {
    // multer placed file info on req.file
    if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

    // req.user is set by auth middleware (user id)
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    // build URL/path to serve later (we serve /uploads statically)
    const filepath = `/uploads/${req.file.filename}`;

    // create DB record
    const resume = await Resume.create({
      userId,
      filename: req.file.originalname,
      filepath,
      text: '' // we can fill this later with actual parsed text
    });

    res.status(201).json({ message: 'Uploaded', resume });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error during upload.' });
  }
};

// GET /api/resumes
exports.getResumes = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error('Get resumes error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/resumes/:id
exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    // optional: ensure owner matches req.user.id
    if (String(resume.userId) !== String(req.user?.id)) return res.status(403).json({ message: 'Forbidden' });
    res.json(resume);
  } catch (err) {
    console.error('Get resume by id error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};
