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

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req, res) => {
    return console.log(res);
    // res.json(__dirname, '/db/db.json')
    // res.sendFile(path.join(__dirname, db))
    // return res.json(db);
}
);

app.post('/api/notes', (req, res) => {

    // fs.appendFile(db, req.body, err => err ? console.log(err) : console.log('Note added!')); 

    res.json(`${req.method} has been received from ${req.path}`);
});

app.listen(PORT, () => {
    console.log(`Express server listening on localhost:${PORT}`)
});