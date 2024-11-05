const Club = require('../models/Club');

exports.createClub = async (req, res) => {
    try {
        const club = new Club(req.body);
        await club.save();
        res.status(201).json(club);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getClubById = async (req, res) => {
    try {
        const club = await Club.findById(req.params.clubId).populate('students').populate('college');
        if (!club) return res.status(404).json({ message: 'Club not found' });
        res.json(club);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateClub = async (req, res) => {
    try {
        const club = await Club.findByIdAndUpdate(req.params.clubId, req.body, { new: true });
        if (!club) return res.status(404).json({ message: 'Club not found' });
        res.json(club);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteClub = async (req, res) => {
    try {
        const club = await Club.findByIdAndDelete(req.params.clubId);
        if (!club) return res.status(404).json({ message: 'Club not found' });
        res.json({ message: 'Club deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllClubs = async (req, res) => {
    try {
        const clubs = await Club.find().populate('students').populate('college');
        res.json(clubs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
