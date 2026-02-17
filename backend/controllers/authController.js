const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, department, year, cgpa, backlogs } = req.body;
        console.log(`Registration attempt for email: ${email}`);

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            department,
            year,
            cgpa,
            backlogs
        });

        await user.save();

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for email: ${email}`);

        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const {
            name, city, college, cgpa, profession,
            department, year, backlogs, mobile,
            skills, competencies, linkedin, github, profileImage
        } = req.body;

        // Build profile object
        const profileFields = {};
        if (name) profileFields.name = name;
        if (city) profileFields.city = city;
        if (college) profileFields.college = college;
        if (cgpa !== undefined) profileFields.cgpa = cgpa;
        if (profession) profileFields.profession = profession;
        if (department) profileFields.department = department;
        if (year) profileFields.year = year;
        if (backlogs !== undefined) profileFields.backlogs = backlogs;
        if (mobile) profileFields.mobile = mobile;
        if (linkedin) profileFields.linkedin = linkedin;
        if (github) profileFields.github = github;

        if (skills) {
            profileFields.skills = Array.isArray(skills)
                ? skills
                : skills.split(',').map(skill => skill.trim());
        }
        if (competencies) profileFields.competencies = competencies;
        if (profileImage) profileFields.profileImage = profileImage;

        let user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.user.userId,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
