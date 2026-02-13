const Evaluation = require('../models/Evaluation');
const User = require('../models/User');

exports.evaluate = async (req, res) => {
    try {
        const { technicalScore, aptitudeScore, communicationScore } = req.body;
        const userId = req.user.userId; // Middleware should set this

        const totalScore = technicalScore + aptitudeScore + communicationScore;
        let status = 'Not Ready';
        let recommendations = [];

        // Simple logic for demonstration
        if (totalScore >= 80) {
            status = 'Ready';
            recommendations.push('Keep up the good work! Focus on mock interviews.');
        } else if (totalScore >= 50) {
            status = 'Nearly Ready';
            if (technicalScore < 30) recommendations.push('Improve technical skills.');
            if (aptitudeScore < 30) recommendations.push('Practice more aptitude questions.');
            if (communicationScore < 20) recommendations.push('Work on communication skills.');
        } else {
            status = 'Not Ready';
            recommendations.push('Overall improvement needed in all areas.');
        }

        const evaluation = new Evaluation({
            userId,
            technicalScore,
            aptitudeScore,
            communicationScore,
            totalScore,
            status,
            recommendations
        });

        await evaluation.save();
        res.json(evaluation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findOne({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(evaluation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
