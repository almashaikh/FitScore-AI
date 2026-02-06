require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const OpenAI = require('openai');


const app = express();

/* -------------------- OPENAI -------------------- */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* -------------------- UTILS -------------------- */
function cosineSimilarity(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors({ 
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true 
}));
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30
});
app.use('/api/', limiter);

/* -------------------- MONGOOSE -------------------- */
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume_ranker_db')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err.message));

/* -------------------- MODEL -------------------- */
const ResumeSchema = new mongoose.Schema({
  originalName: String,
  filename: String,
  path: String,
  text: String,
  size: Number,
  createdAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', ResumeSchema);

/* -------------------- UPLOAD CONFIG -------------------- */
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, UPLOAD_DIR),
    filename: (_, file, cb) =>
      cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, '_'))
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) =>
    file.mimetype === 'application/pdf'
      ? cb(null, true)
      : cb(new Error('Only PDF allowed'))
});

/* -------------------- ROUTES -------------------- */

/* UPLOAD RESUME (PDF STORAGE ONLY - Use text input for analysis) */
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Note: PDF text extraction doesn't work on Vercel serverless
    // Users should paste resume text directly in the analyze page for best results
    
    const resume = await Resume.create({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      text: '' // PDF processing disabled on serverless - use text input instead
    });

    res.json({
      success: true,
      id: resume._id,
      message: 'Resume uploaded. Please paste your resume text in the Analyze page for accurate scoring.'
    });

  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});



/* LIST RESUMES */
app.get('/api/resumes', async (_, res) => {
  const resumes = await Resume.find().sort({ createdAt: -1 }).select('-text');
  res.json(resumes);
});

/* DELETE RESUME */
app.delete('/api/resumes/:id', async (req, res) => {
  const r = await Resume.findById(req.params.id);
  if (!r) return res.status(404).json({ error: 'Not found' });

  if (fs.existsSync(r.path)) fs.unlinkSync(r.path);
  await r.deleteOne();

  res.json({ success: true });
});

/* ANALYZE (PDF TEXT ONLY) */
app.post('/api/analyze', async (req, res) => {
  try {
    const { resumeId, resumeText: pastedResumeText, jdText } = req.body;

    if (!jdText || (!resumeId && !pastedResumeText)) {
      return res.status(400).json({
        error: 'Job description and resume text are required'
      });
    }

    // ----------------------------------
    // 1️⃣ Decide resume text source
    // ----------------------------------
    let resumeText = '';

    if (pastedResumeText && pastedResumeText.trim()) {
      // ✅ PRIMARY: pasted resume text (best accuracy)
      resumeText = pastedResumeText.toLowerCase();
    } else if (resumeId) {
      // 🔁 SECONDARY: stored resume text
      const resume = await Resume.findById(resumeId);
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }
      resumeText = (resume.text || '').toLowerCase();
    }

    const jd = jdText.toLowerCase();

    // ----------------------------------
    // 2️⃣ Weak / missing resume text
    // ----------------------------------
    if (!resumeText.trim()) {
      return res.json({
        score: 30,
        confidence: 'Low',
        method: 'Low-confidence fallback',
        note: 'Resume text was unavailable or weak. Score normalized.'
      });
    }

    // ----------------------------------
    // 3️⃣ Stopwords + cleaning
    // ----------------------------------
    const STOPWORDS = new Set([
      'and','or','the','a','an','with','to','for','of','in','on','at','by',
      'is','are','was','were','be','as','that','this','it','from','you','your'
    ]);

    const clean = (text) =>
      text
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2 && !STOPWORDS.has(w));

    const resumeWords = new Set(clean(resumeText));
    const jdWords = clean(jd);

    if (jdWords.length === 0) {
      return res.json({
        score: 30,
        confidence: 'Low',
        method: 'Invalid JD',
        note: 'Job description text was empty'
      });
    }

    // ----------------------------------
    // 4️⃣ Skill-weighted matching
    // ----------------------------------
    const importantJDWords = [...new Set(jdWords)];

    const matchedSkills = importantJDWords.filter(word =>
      resumeWords.has(word)
    );

    const matchRatio =
      matchedSkills.length / importantJDWords.length;

    // ----------------------------------
    // 5️⃣ Score normalization
    // ----------------------------------
    let score = Math.round(30 + matchRatio * 70);

    if (score > 95) score = 95;
    if (score < 30) score = 30;

    // ----------------------------------
    // 6️⃣ Confidence level
    // ----------------------------------
    let confidence = 'Low';
    if (score >= 46) confidence = 'Medium';
    if (score >= 66) confidence = 'High';
    if (score >= 86) confidence = 'Excellent';

    // ----------------------------------
    // 7️⃣ Final response
    // ----------------------------------
    res.json({
      score,
      confidence,
      method: 'Skill-weighted matching',
      matchedSkills: matchedSkills.slice(0, 10),
      totalJDKeywords: importantJDWords.length
    });

  } catch (err) {
    console.error('Analyze error:', err);
    res.status(500).json({ error: 'Analysis failed' });
  }
});



/* -------------------- START -------------------- */
// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Export for Vercel serverless
module.exports = app;
