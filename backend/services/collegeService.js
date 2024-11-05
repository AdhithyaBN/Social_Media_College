const College = require('../models/College');

exports.createCollege = async (req, res) => {
    try {
        const college = new College(req.body);
        await college.save();
        res.status(201).json(college);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCollegeById = async (req, res) => {
    try {
        const college = await College.findById(req.params.collegeId).populate('clubs').populate('clubsWaitingApproval').populate('eventsConducted');
        if (!college) return res.status(404).json({ message: 'College not found' });
        res.json(college);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(req.params.collegeId, req.body, { new: true });
        if (!college) return res.status(404).json({ message: 'College not found' });
        res.json(college);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndDelete(req.params.collegeId);
        if (!college) return res.status(404).json({ message: 'College not found' });
        res.json({ message: 'College deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find().populate('clubs').populate('clubsWaitingApproval').populate('eventsConducted');
        res.json(colleges);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.addClubToCollege = async (req, res) => {
    try {
        const college = await College.findById(req.params.collegeId);
        if (!college) return res.status(404).json({ message: 'College not found' });

        college.clubs.push(req.body.clubId);
        await college.save();
        res.json(college);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.addEventToCollege = async (req, res) => {
    try {
        const college = await College.findById(req.params.collegeId);
        if (!college) return res.status(404).json({ message: 'College not found' });

        college.eventsConducted.push(req.body.eventId);
        await college.save();
        res.json(college);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
