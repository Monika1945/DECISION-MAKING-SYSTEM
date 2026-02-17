const Evaluation = require('../models/Evaluation');
const User = require('../models/User');

exports.evaluate = async (req, res) => {
    try {
        const { technicalScore, aptitudeScore, communicationScore, logicalScore, leadershipScore, technicalSkills, companyPreference, interestedSkill } = req.body;
        const userId = req.user.userId;

        const totalScore = technicalScore + aptitudeScore + communicationScore + logicalScore + leadershipScore;
        let status = 'Not Ready';
        let recommendations = [];

        // Updated logic for Total 150
        if (totalScore >= 120) {
            status = 'Ready';
            recommendations.push('Excellent! You are fully prepared for high-tier placements.');
        } else if (totalScore >= 75) {
            status = 'Nearly Ready';
            if (technicalScore < 35) recommendations.push('Focus more on technical depth.');
            if (logicalScore < 20) recommendations.push('Practice advanced logical reasoning.');
            if (leadershipScore < 12) recommendations.push('Participate in team projects to build leadership.');
        } else {
            status = 'Not Ready';
            recommendations.push('Comprehensive preparation is required across all modules.');
        }

        // Add tailored recommendations based on preference
        if (companyPreference === 'Product Based') {
            recommendations.push('For product-based companies, master Data Structures and Algorithms (DSA).');
        } else if (companyPreference === 'Service Based') {
            recommendations.push('For service-based companies, focus on aptitude and core CS fundamentals.');
        }

        if (interestedSkill) {
            recommendations.push(`Keep building your expertise in ${interestedSkill} to stand out.`);
        }

        const evaluation = new Evaluation({
            userId,
            technicalScore,
            aptitudeScore,
            communicationScore,
            logicalScore,
            leadershipScore,
            totalScore,
            technicalSkills,
            status,
            recommendations,
            companyPreference,
            interestedSkill
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
        const { id } = req.query;
        let evaluation;
        if (id) {
            evaluation = await Evaluation.findById(id);
            if (!evaluation || evaluation.userId.toString() !== req.user.userId) {
                return res.status(404).json({ msg: 'Evaluation not found' });
            }
        } else {
            evaluation = await Evaluation.findOne({ userId: req.user.userId }).sort({ createdAt: -1 });
        }
        res.json(evaluation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.getHistory = async (req, res) => {
    try {
        const history = await Evaluation.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
