const express = require('express');
const db = require('./db/db.json');
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(`${req.method} has been received from ${req.path}`);
});

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} has been received from ${req.path}`);
});

app.listen(PORT, () => {
    console.log(`Express server listening on localhost:${PORT}`)
});