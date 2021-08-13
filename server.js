const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

const db = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (request, response) => {
    console.info(`${request.method} request has been received from ${request.path}`);

    response.json(db);
});

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/index.html'));
});


app.post('/api/notes', (request, response) => {

    // fs.appendFile(db, request.body, err => err ? console.log(err) : console.log('Note added!')); 

    response.json(`${request.method} has been received from ${request.path}`);
});

app.listen(PORT, () => {
    console.log(`Express server listening on localhost:${PORT}`)
});