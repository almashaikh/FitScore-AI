// src/routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    // unique filename: timestamp-originalname
    const ts = Date.now();
    const safe = file.originalname.replace(/\s+/g, '_');
    cb(null, `${ts}_${safe}`);
  }
});
const upload = multer({ storage });

// controllers
const { uploadResume, getResumes, getResumeById } = require('../controllers/resumeController');

// protected routes
router.post('/upload', auth, upload.single('file'), uploadResume);
router.get('/', auth, getResumes);
router.get('/:id', auth, getResumeById);

module.exports = router;
