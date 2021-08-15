const express = require('express');
const path = require('path');
const notesRouter = require('./routes/notes');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// || Render notes.html file (note writing page)
app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.use('/api/notes', notesRouter);

// || Render index.html file (home page)
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Express server listening on localhost:${PORT}`)
});