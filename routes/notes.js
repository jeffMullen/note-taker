const express = require('express');
const notesRouter = express.Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');
const db = require('../db/db.json');

// || Send db file to notes.html to be rendered
notesRouter.get('/', (request, response) => {
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
notesRouter.post('/', (request, response) => {
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
notesRouter.delete('/:id', (request, response) => {
    console.info(`${request.method} has been received from ${request.path}`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataArray = JSON.parse(data);

            dataArray.forEach((el, index) => {
                if (el.id === request.params.id) {
                    dataArray.splice(index, 1);
                }
            });

            fs.writeFile('./db/db.json', JSON.stringify(dataArray), err => {
                err
                    ? console.error(err)
                    : console.log('New file has been written!');
            })
        }
    })
    response.json(db);

})

module.exports = notesRouter;