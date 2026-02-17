const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String },
  year: { type: String },
  cgpa: { type: Number },
  backlogs: { type: Number, default: 0 },
  city: { type: String },
  college: { type: String },
  profession: { type: String },
  mobile: { type: String },
  skills: { type: [String] },
  competencies: [{
    skill: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
  }],
  linkedin: { type: String },
  github: { type: String },
  profileImage: { type: String, default: '/img3.png' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
