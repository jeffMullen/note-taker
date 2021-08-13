const express = require('express');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const path = require('path');

const db = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// || Render notes.html file (note writing page)
app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/notes.html'));
});

// || Send db file to notes.html to be rendered
app.get('/api/notes', (request, response) => {
    console.info(`${request.method} request has been received from ${request.path}`);

    // || Read db file and parse to edit
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);

            response.json(parsedNotes);
        }
    });
});

// || Save a note
app.post('/api/notes', (request, response) => {
    console.info(`${request.method} has been received from ${request.path}`);

    // || Destructure request body
    const { title, text } = request.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        }

        // || Read db file and parse to edit
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                // || Add new data to the db file
                parsedNotes.push(newNote);

                // || Write the db file again with updated array
                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), err => {
                    err
                        ? console.error(err)
                        : console.log('New note has been written!');
                })
            }
        })
    }

    response.json(db);

});

// || Delete a note
app.delete('/api/notes/:id', (request, response) => {
    // console.log('delete path');
    // console.log(request.params.id);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataArray = JSON.parse(data);
            // console.log(dataArray);

            dataArray.forEach((el, index) => {
                if (el.id === request.params.id) {
                    console.log(el);
                    // dataArray.splice(el, 1);
                }
            });
        }
    })


})

// || Render index.html file (home page)
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Express server listening on localhost:${PORT}`)
});