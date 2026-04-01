const Evaluation = require('../models/Evaluation');

exports.evaluate = async (req, res) => {
    try {
        const {
            technicalScore,
            aptitudeScore,
            communicationScore,
            logicalScore,
            leadershipScore,
            technicalSkills,
            companyPreference,
            interestedSkill
        } = req.body;
        const userId = req.user.userId;

        const normalizedScores = {
            technicalScore: Number(technicalScore) || 0,
            aptitudeScore: Number(aptitudeScore) || 0,
            communicationScore: Number(communicationScore) || 0,
            logicalScore: Number(logicalScore) || 0,
            leadershipScore: leadershipScore === undefined ? undefined : Number(leadershipScore) || 0
        };

        const activeScores = Object.values(normalizedScores).filter((value) => value !== undefined);
        const totalScore = activeScores.reduce((sum, value) => sum + value, 0);
        const maxScore = activeScores.length * 5;
        const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
        let status = 'Not Ready';
        let recommendations = [];

        if (percentage >= 75) {
            status = 'Ready';
            recommendations.push('Excellent progress. You are performing well across the recent assessment.');
        } else if (percentage >= 50) {
            status = 'Nearly Ready';
            if (normalizedScores.technicalScore < 3) recommendations.push('Focus more on technical depth and problem solving.');
            if (normalizedScores.logicalScore < 3) recommendations.push('Practice logical reasoning and timed problem sets.');
            if (normalizedScores.communicationScore < 3) recommendations.push('Work on verbal clarity, mock interviews, and communication drills.');
            if (normalizedScores.aptitudeScore < 3) recommendations.push('Strengthen aptitude fundamentals with regular practice.');
            if (normalizedScores.leadershipScore !== undefined && normalizedScores.leadershipScore < 3) {
                recommendations.push('Participate in team projects to build leadership confidence.');
            }
        } else {
            status = 'Not Ready';
            recommendations.push('Comprehensive preparation is required across all modules.');
        }

        const normalizedCompanyPreference =
            companyPreference === 'Product' ? 'Product Based'
            : companyPreference === 'Service' ? 'Service Based'
            : companyPreference;

        if (normalizedCompanyPreference === 'Product Based') {
            recommendations.push('For product-based companies, master Data Structures and Algorithms (DSA).');
        } else if (normalizedCompanyPreference === 'Service Based') {
            recommendations.push('For service-based companies, focus on aptitude and core CS fundamentals.');
        } else if (normalizedCompanyPreference === 'Startup') {
            recommendations.push('For startups, highlight adaptability, practical projects, and problem ownership.');
        }

        if (interestedSkill) {
            recommendations.push(`Keep building your expertise in ${interestedSkill} to stand out.`);
        }

        const evaluation = new Evaluation({
            userId,
            technicalScore: normalizedScores.technicalScore,
            aptitudeScore: normalizedScores.aptitudeScore,
            communicationScore: normalizedScores.communicationScore,
            logicalScore: normalizedScores.logicalScore,
            leadershipScore: normalizedScores.leadershipScore ?? 0,
            totalScore,
            maxScore,
            technicalSkills,
            status,
            recommendations,
            companyPreference: normalizedCompanyPreference,
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
