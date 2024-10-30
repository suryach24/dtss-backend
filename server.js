const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoutes = require('./routes/contacts'); // Import your routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const mongoURI = 'mongodb+srv://suryach24:F8SNjwVgs9IGjGWr@cluster0.tyycl.mongodb.net/address-book?retryWrites=true&w=majority'; 

mongoose.connect(mongoURI)
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

