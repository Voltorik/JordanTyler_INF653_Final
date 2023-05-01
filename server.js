require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');

const verifyStates = require('./middleware/verifyStates');
const PORT = process.env.PORT || 3000

// Mongo DB connection
connectDB();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware for json 
app.use(express.json());

// Route to public html page
app.use('/', require('./routes/root'));

// Routes
app.use('/states', require('./routes/api/states'));

// Route does not exist, catch all
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('text/html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('application/json')) {
        res.json({ "error": "404 Not Found" });
    }
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});