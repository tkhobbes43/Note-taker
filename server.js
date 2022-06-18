const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = uuid();
        notes.push(newNote);

        const createNote = JSON.stringify(notes);
        fs.writeFile(path.join(__dirname, "./db/db.json"), createNote, (err) => {
            if (err) throw err;
        });
        res.json(newNote);
    });
});

// GET /notes route to return notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        const notesFromFile = JSON.parse(data)
        res.json(notesFromFile)
        if (err) throw err;
    });
});

// GET Wildcard route to direct users to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(data)
    notes = notes.filter(notes => notes.id.toString() !== req.params.id.toString());
    fs.readFile('./db/db.json', JSON.stringify(notes));
        res.json(notes);
    
})

app.listen(PORT , () => {
    console.log(`the server is up now on ${PORT}!`);
});
