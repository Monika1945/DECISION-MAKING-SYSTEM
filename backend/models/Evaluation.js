const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    technicalScore: { type: Number, required: true },
    aptitudeScore: { type: Number, required: true },
    communicationScore: { type: Number, required: true },
    logicalScore: { type: Number, required: true },
    leadershipScore: { type: Number, required: true },
    totalScore: { type: Number, required: true },
    technicalSkills: [{
        skill: { type: String },
        rating: { type: Number }
    }],
    status: { type: String, enum: ['Ready', 'Nearly Ready', 'Not Ready'], required: true },
    companyPreference: { type: String },
    interestedSkill: { type: String },
    recommendations: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);
