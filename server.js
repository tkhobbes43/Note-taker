const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET /notes route to return notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);
// GET Wildcard route to direct users to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);
