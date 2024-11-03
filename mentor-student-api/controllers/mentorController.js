const Mentor = require('../models/Mentor');

exports.createMentor = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).send(mentor);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};