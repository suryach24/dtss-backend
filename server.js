const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoutes = require('./routes/contacts'); // Import your routes
require('dotenv').config()

const url = process.env.MONGODB_URI
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
      origin: 'https://surya-kukunuri.com',
      optionsSuccessStatus: 200,
    })
  );
app.use(bodyParser.json()); 

mongoose.connect(url, {})
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the contact routes
app.use('/api/contacts', contactRoutes); // This line registers the routes

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

