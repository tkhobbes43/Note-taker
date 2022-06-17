const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET /notes route to return notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);
// GET Wildcard route to direct users to index.html
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        const notesFromFile = JSON.parse(data)
        res.json(notesFromFile)
    })
})

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT , () => {
    console.log('the server is up')
})