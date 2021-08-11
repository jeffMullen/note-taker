const express = require('express');
const db = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.json(`${req.method} has been received from ${req.path}`);
});

app.get('*', (req, res) => {
    res.json(`${req.method} has been received from ${req.path}`);
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