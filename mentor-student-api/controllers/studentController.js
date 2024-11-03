const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};