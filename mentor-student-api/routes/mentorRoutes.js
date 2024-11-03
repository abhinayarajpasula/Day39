const express = require('express');
const Mentor = require('../models/Mentor'); // Adjust the path according to your project structure
const Student = require('../models/Student'); // Import the Student model
const router = express.Router();

// Route to create a Mentor
router.post('/', async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).send(mentor);
    } catch (error) {
        console.error('Error creating mentor:', error);
        res.status(403).send({ error: 'Forbidden: ' + error.message });
    }
});

// Route to assign a student to a mentor
router.post('/assign-student', async (req, res) => {
    const { mentorId, studentIds } = req.body; // Expecting an array of student IDs
    try {
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).send({ error: 'Mentor not found' });
        }

        // Update multiple students with the mentor ID
        const students = await Student.updateMany(
            { _id: { $in: studentIds } }, // Filter to find the specified student IDs
            { $set: { mentorId: mentorId } } // Assign the mentorId to these students
        );

        res.status(200).send({ message: 'Students assigned to mentor successfully', students });
    } catch (error) {
        console.error('Error assigning students to mentor:', error);
        res.status(400).send({ error: 'Failed to assign students' });
    }
});

module.exports = router;