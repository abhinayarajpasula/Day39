const express = require('express');
const mongoose = require('mongoose'); // Import mongoose for ObjectID validation
const Student = require('../models/Student'); // Ensure this path is correct
const Mentor = require('../models/Mentor'); // Import the Mentor model
const router = express.Router();

// Route to get all students (for testing purposes)
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).send(students);
    } catch (error) {
        console.error('Error retrieving students:', error);
        res.status(500).send({ error: 'Failed to retrieve students' });
    }
});

// Route to create a new student
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(400).send({ error: 'Failed to create student' });
    }
});

// Route to assign or change a mentor for a specific student
router.post('/assign-mentor', async (req, res) => {
    const { studentId, mentorId } = req.body;

    // Validate ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(mentorId)) {
        return res.status(400).send({ error: 'Invalid student or mentor ID' });
    }

    try {
        // Check if the mentor exists
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).send({ error: 'Mentor not found' });
        }

        // Find the student and update their mentorId
        const student = await Student.findByIdAndUpdate(
            studentId,
            { mentorId: mentorId }, // Assign the new mentorId
            { new: true } // Return the updated student document
        );

        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }

        res.status(200).send({ message: 'Mentor assigned successfully', student });
    } catch (error) {
        console.error('Error assigning mentor:', error);
        res.status(400).send({ error: 'Failed to assign mentor' });
    }
});

// Route to get the list of students without a mentor
router.get('/without-mentor', async (req, res) => {
    try {
        const students = await Student.find({ mentorId: null }); // Get students with no mentorId
        res.status(200).send(students);
    } catch (error) {
        console.error('Error retrieving students:', error);
        res.status(500).send({ error: 'Failed to retrieve students' });
    }
});

// Route to show all students for a particular mentor
router.get('/for-mentor/:mentorId', async (req, res) => {
    const { mentorId } = req.params;

    // Validate ObjectID
    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
        return res.status(400).send({ error: 'Invalid mentor ID' });
    }

    try {
        const students = await Student.find({ mentorId: mentorId }); // Find students with the specified mentorId
        res.status(200).send(students);
    } catch (error) {
        console.error('Error retrieving students for mentor:', error);
        res.status(500).send({ error: 'Failed to retrieve students for mentor' });
    }
});

// Route to show the previously assigned mentor for a particular student
router.get('/:studentId/mentor', async (req, res) => {
    const { studentId } = req.params;

    // Validate ObjectID
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).send({ error: 'Invalid student ID' });
    }

    try {
        const student = await Student.findById(studentId).populate('mentorId'); // Populate the mentor details

        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }

        // Check if the student has an assigned mentor
        if (!student.mentorId) {
            return res.status(404).send({ error: 'No mentor assigned to this student' });
        }

        res.status(200).send({
            student: {
                name: student.name,
                email: student.email,
                mentor: student.mentorId, // Send mentor details
            },
        });
    } catch (error) {
        console.error('Error retrieving mentor for student:', error);
        res.status(500).send({ error: 'Failed to retrieve mentor for student' });
    }
});

module.exports = router;