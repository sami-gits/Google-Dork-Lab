const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static('public'));

// Enable directory listing for reports
app.use('/reports', serveIndex(path.join(__dirname, 'public/reports'), { icons: true }));

// Login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Simulated error route
app.get('/error', (req, res) => {
    res.send("Database connection failed: Access denied for user 'root'");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});