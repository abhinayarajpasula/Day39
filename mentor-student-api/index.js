const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes'); // Ensure this path is correct
const mentorRoutes = require('./routes/mentorRoutes'); // Ensure path is correct

const app = express();

// Enable CORS
const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json()); // For parsing application/json

// MongoDB Debug Mode
mongoose.set('debug', true); 

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mentor-student') // Replace with your database name
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Use student routes
app.use('/students', studentRoutes); // This mounts the studentRoutes on the /students path

// Mount mentor routes with /api prefix
app.use('/api/mentors', mentorRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});