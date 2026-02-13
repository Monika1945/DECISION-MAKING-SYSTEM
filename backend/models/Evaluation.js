const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    technicalScore: { type: Number, required: true },
    aptitudeScore: { type: Number, required: true },
    communicationScore: { type: Number, required: true },
    totalScore: { type: Number, required: true },
    status: { type: String, enum: ['Ready', 'Nearly Ready', 'Not Ready'], required: true },
    recommendations: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);
