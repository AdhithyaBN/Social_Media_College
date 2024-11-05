const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the CORS middleware
require('dotenv').config();  // Load environment variables from .env

// Initialize Express App
const app = express();

// Enable CORS for all routes and origins
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend origin
  methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
  credentials: true                // Allow credentials (cookies, auth headers, etc.)
}));

// Middleware
app.use(bodyParser.json());

// Import Routes
const clubRoutes = require('./routes/clubRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Connect to MongoDB using MONGODB_URI from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api/clubs', clubRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/students', studentRoutes);

// Start the server using the PORT from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
