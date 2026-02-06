// src/models/User.js
// User schema for authentication

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Check if model exists before creating (serverless compatibility)
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
