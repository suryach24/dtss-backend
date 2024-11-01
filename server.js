const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoutes = require('./routes/contacts'); // Import your routes
require('dotenv').config()

const url = process.env.MONGODB_URI
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:3000', 'https://surya-kukunuri.com'];

app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (e.g., mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      optionsSuccessStatus: 200,
    })
  );
app.use(bodyParser.json()); 

mongoose.connect(url, {})
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit the application if unable to connect to MongoDB
    });


// Use the contact routes
app.use('/api/contacts', contactRoutes); // This line registers the routes

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

