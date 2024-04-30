//Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const comments = require('./comments.json');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

//Post comments
app.post('/comments', (req, res) => {
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if(err) {
            res.status(500).send('Error');
        } else {
            res.status(201).send('OK');
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});