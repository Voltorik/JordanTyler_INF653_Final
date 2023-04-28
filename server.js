require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./config/dbConn')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000

// Mongo DB connection
connectDB() 

// Route does not exist catch all
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
})