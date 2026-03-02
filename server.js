const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');

const app = express();

/* ===============================
   FORCE ROBOTS.TXT (IMPORTANT)
================================= */
app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send("User-agent: *\nAllow: /");
});

/* ===============================
   SERVE STATIC FILES
================================= */
app.use(express.static(path.join(__dirname, 'public')));

/* ===============================
   ENABLE DIRECTORY LISTING
================================= */
app.use('/reports', serveIndex(path.join(__dirname, 'public/reports'), { icons: true }));

/* ===============================
   LOGIN ROUTE
================================= */
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

/* ===============================
   ERROR SIMULATION ROUTE
================================= */
app.get('/error', (req, res) => {
    res.send("Database connection failed: Access denied for user 'root'");
});

/* ===============================
   START SERVER
================================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});